"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  gradeLevel: z.string({
    required_error: "Please select a grade level.",
  }),
  question: z.string().min(10, {
    message: "Question must be at least 10 characters.",
  }),
})

export function HomeworkForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [response, setResponse] = useState<string | null>(null)
  const [showNextStep, setShowNextStep] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      gradeLevel: "",
      question: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/homework-help', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          step: currentStep,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      setResponse(data.response)
      setShowNextStep(true)
    } catch (error) {
      console.error('Error:', error)
      setResponse('Sorry, there was an error processing your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleNextStep() {
    setCurrentStep(prev => prev + 1)
    setShowNextStep(false)
    setResponse(null)
    form.reset()
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Math, Science, History, etc." {...field} />
                  </FormControl>
                  <FormDescription>
                    The academic subject of your question
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gradeLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your grade level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="elementary">Elementary School</SelectItem>
                      <SelectItem value="middle">Middle School</SelectItem>
                      <SelectItem value="high">High School</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                      <SelectItem value="graduate">Graduate School</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Your current educational level
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Homework Question</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Type your homework question here in detail..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Include all relevant details and context for better guidance
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              currentStep === 1 ? "Get Started" : "Continue Guidance"
            )}
          </Button>
        </form>
      </Form>

      {response && (
        <Card className="mt-8 border-primary/20">
          <CardHeader>
            <CardTitle>Step {currentStep} of 3</CardTitle>
            <CardDescription>
              Understanding your question step by step
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: response.replace(/\n/g, '<br>') }} />
            </div>
            {showNextStep && currentStep < 3 && (
              <Button 
                onClick={handleNextStep}
                className="mt-6"
              >
                Next Step
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}