
import { StatsOverview } from '@/components/stats-overview'
import { loadLLMData } from '@/lib/server-data'
import { LLMResponse } from '@/lib/types'
import { MainDisplay } from '@/components/main-display'
import { Button } from '@/components/ui/button'
import { ArrowDown, Github } from 'lucide-react'

async function getData(): Promise<LLMResponse[]> {
  try {
    return await loadLLMData()
  } catch (error) {
    console.error("Failed to load data:", error)
    return []
  }
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          What is True Status?
        </h1>
        <p className="mt-4 max-w-3xl text-lg md:text-xl text-muted-foreground">
          We asked leading AI models to tell us what they consider high-status. This project is a raw, unfiltered look into the values and biases encoded in modern Large Language Models.
        </p>
        <div className="mt-8 flex gap-4">
          <Button size="lg" asChild>
            <a href="#explore">Start Exploring <ArrowDown className="ml-2 h-5 w-5" /></a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="https://github.com/your-repo/status-llms" target="_blank">View on GitHub <Github className="ml-2 h-5 w-5" /></a>
          </Button>
        </div>
      </div>

      <section id="stats" className="mb-16">
        <StatsOverview responses={data} />
      </section>

      <section id="explore">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Explore the Data</h2>
          <p className="text-muted-foreground mt-2">Filter and sort through every response from every model.</p>
        </div>
        <MainDisplay initialData={data} />
      </section>
    </main>
  )
}
