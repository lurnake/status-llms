export default function Analysis() {
  return (
    <main className="container mx-auto p-4 md:p-8 max-w-5xl">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Analysis</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Highest and Lowest Rated Status Symbols</h2>
            <p className="mb-4">
              The highest-rated status symbols consistently revolve around extreme wealth, exclusivity, and achievement on a global scale. The top-rated items across all models include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Winning a Nobel Prize (often rated 99 or 100)</li>
              <li>Private jet ownership (consistently in the high 90s)</li>
              <li>Superyacht ownership (also in the high 90s)</li>
              <li>Owning a private island (rated 98)</li>
              <li>Having a Forbes Billionaires List ranking (rated 100)</li>
            </ul>
            <p className="mb-4">
              At the other end of the spectrum, the lowest-rated items, while still markers of a certain level of affluence, are more accessible and mainstream:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Wearing AirPods Pro (rated 52)</li>
              <li>Owning the latest iPhone Pro Max (rated as low as 52)</li>
              <li>Having a Peloton with membership (rated 58)</li>
              <li>A high-end gaming PC setup (rated as low as 58)</li>
              <li>Wearing limited-edition designer sneakers (rated as low as 52)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Model Behavior and Temperature</h2>
            <p className="mb-4">
              There are some interesting differences in how the various models perceive status, and how the temperature setting affects their responses:
            </p>
            <p className="mb-4">
              <strong>Gemini-2.5-pro</strong> tends to produce very high ratings, with a significant number of items rated 95 and above. It also seems to have a broader definition of status, including things like &quot;a feature article byline in The New Yorker&quot;.
            </p>
            <p className="mb-4">
              <strong>Gpt-4.1 and Gpt-4o</strong> offer a more balanced view, with a wider range of ratings. They also include more modern and tech-related status symbols, such as &quot;a verified social media account with over 1 million followers&quot; and &quot;owning rare cryptocurrencies worth millions&quot;.
            </p>
            <p className="mb-4">
              <strong>Grok-4 and Kimi-K2</strong> seem to focus more on traditional luxury and achievement, with a strong emphasis on brand names (Rolex, Patek Philippe, Hermès) and exclusive experiences (attending the Met Gala, Davos).
            </p>
            <p className="mb-4">
              <strong>Claude-Opus-4 and Claude-Sonnet-4</strong> provide a good mix of traditional and modern status symbols, with a particular focus on education and intellectual achievements (e.g., &quot;PhD from prestigious university&quot;, &quot;publishing in prestigious journals&quot;).
            </p>
            <p className="mb-4">
              As for the temperature setting, higher temperatures (e.g., 1.0, 1.2) tend to produce more diverse and sometimes more extreme or unusual suggestions. For example, at higher temperatures, we see items like &quot;climbing Mount Everest&quot;, &quot;participating in space tourism&quot;, and &quot;owning a private art gallery&quot;. Lower temperatures (e.g., 0.2, 0.7) tend to stick to more conventional and well-established status symbols.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Objects vs. Activities</h2>
            <p className="mb-4">
              The data shows a fairly even split between status symbols that are objects (things you own) and those that are activities (things you do).
            </p>
            <p className="mb-4">
              <strong>Objects of status</strong> are often luxury goods like private jets, yachts, high-end watches, and designer clothing. However, they also include things like rare art, wine collections, and even a &quot;Bitcoin millionaire portfolio&quot;.
            </p>
            <p className="mb-4">
              <strong>Activities that confer status</strong> range from exclusive events like the Met Gala and Davos to personal achievements like winning a Nobel Prize or running a marathon. Experiences like &quot;heli-skiing&quot; and &quot;a bespoke African safari&quot; also feature prominently.
            </p>
            <p>
              This suggests that status is not just about what you have, but also about what you do and the experiences you can access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Most Common Status Symbols</h2>
            <p className="mb-4">
              Across all models and temperatures, a few status symbols appear with remarkable frequency:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Private jet ownership</li>
              <li>Owning a luxury yacht/superyacht</li>
              <li>Attending the Met Gala</li>
              <li>Owning a Patek Philippe watch</li>
              <li>Winning a Nobel Prize</li>
              <li>Attending an Ivy League university</li>
              <li>Owning a Rolls-Royce or Bentley</li>
              <li>Having a personal chef</li>
            </ul>
            <p className="mt-4">
              This indicates a strong consensus among the models about what constitutes the highest levels of status in contemporary society.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Interesting and Unique Items</h2>
            <p className="mb-4">
              Beyond the usual suspects, the models also generated some more creative and thought-provoking status symbols:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>&quot;Carbon-neutral lifestyle certification&quot;</strong> (from Claude-Opus-4) - a nod to the growing importance of environmental consciousness as a status marker.</li>
              <li><strong>&quot;Speaking fluent Mandarin&quot;</strong> (from Kimi-K2) - highlighting the value of cultural capital and global skills.</li>
              <li><strong>&quot;Having a dedicated family office to manage assets&quot;</strong> (from Gemini-2.5-pro) - a subtle but significant indicator of extreme wealth.</li>
              <li><strong>&quot;Owning the newest cutting-edge technology before launch&quot;</strong> (from Gpt-4o) - pointing to the status of being an &quot;insider&quot; in the tech world.</li>
              <li><strong>&quot;Access to exclusive AI compute clusters&quot;</strong> (from Deepseek-r1) - a very modern and niche form of status.</li>
            </ul>
            <p>
              These unique items suggest that the definition of status is evolving, with a growing emphasis on knowledge, skills, and access to exclusive information and opportunities, in addition to traditional markers of wealth and luxury.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}