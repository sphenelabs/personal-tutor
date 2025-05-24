import { HomeworkForm } from '@/components/homework-form';
import { ModeToggle } from '@/components/mode-toggle';
import { GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="text-lg font-semibold">Homework Helper</span>
          </div>
          <ModeToggle />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get Help Understanding Your Homework</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Submit your homework question and receive step-by-step guidance to help you understand the concepts.
            </p>
          </div>
          <HomeworkForm />
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">How It Works</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">1</div>
                <h3 className="font-medium">Submit Your Question</h3>
                <p className="text-sm text-muted-foreground">
                  Fill out the form with your subject, grade level, and homework question.
                </p>
              </div>
              <div className="space-y-2">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">2</div>
                <h3 className="font-medium">Receive Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Get a step-by-step explanation of the concepts and approach.
                </p>
              </div>
              <div className="space-y-2">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">3</div>
                <h3 className="font-medium">Learn & Solve</h3>
                <p className="text-sm text-muted-foreground">
                  Use the guidance to understand the problem and work toward the solution yourself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Homework Helper. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Helping students understand, not just answer.
          </p>
        </div>
      </footer>
    </div>
  );
}