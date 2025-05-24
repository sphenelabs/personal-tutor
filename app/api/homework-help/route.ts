export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { subject, gradeLevel, question, step } = await req.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful, patient tutor who explains concepts step-by-step. You never give away the final answer directly. You guide students to understand the problem logically and arrive at answers themselves. This is step ${step} of 3.`
        },
        {
          role: "user",
          content: `Subject: ${subject}\nGrade level: ${gradeLevel}\nQuestion: ${question}\n\nPlease explain step ${step} of understanding this problem. Focus on helping me understand how to approach this, but do not provide the final answer.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    return NextResponse.json({ response: completion.choices[0].message.content })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}