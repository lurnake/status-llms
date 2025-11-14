
import { StatsOverview } from '@/components/stats-overview'
import { loadLLMData } from '@/lib/server-data'
import { LLMResponse } from '@/lib/types'
import { MainDisplay } from '@/components/main-display'

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
    <main>
      <div className="border-b">
        <div className="container mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-4xl">
            <div className="inline-block mb-6 px-3 py-1 text-xs font-medium tracking-wide uppercase border rounded-full">
              Research Project
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              What do AI models <br />think is high-status?
            </h1>
            <div className="prose prose-lg max-w-2xl">
              <p className="text-xl leading-relaxed text-muted-foreground">
                We prompted frontier language models to rate activities and objects
                on a scale of perceived social status. The results reveal the implicit
                hierarchies encoded in AI systems that increasingly shape how we work,
                communicate, and understand the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="border-b">
        <div className="container mx-auto px-6 md:px-12 py-16">
          <StatsOverview responses={data} />
        </div>
      </section>

      <section id="explore" className="bg-muted/30">
        <div className="container mx-auto px-6 md:px-12 py-16">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Explore the dataset
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Browse {data.reduce((sum, r) => sum + r.items.length, 0)} responses
              from {[...new Set(data.map(r => r.model))].length} models tested at
              different temperature settings.
            </p>
          </div>
          <MainDisplay initialData={data} />
        </div>
      </section>
    </main>
  )
}
