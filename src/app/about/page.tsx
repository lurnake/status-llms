export default function About() {
  return (
    <main className="container mx-auto p-4 md:p-8 max-w-4xl">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">About This Project</h1>
        
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            This project explores how frontier Large Language Models (LLMs) perceive and rank status symbols in contemporary society. By systematically prompting leading AI models including Claude, GPT, Gemini, and others, we&apos;ve compiled a comprehensive dataset of what these models consider to be high-status activities and objects.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Methodology</h2>
          <p>
            We prompted each model to generate lists of status symbols, then asked them to rate these items on a scale of 1-100 for their status value. Each model was tested at different temperature settings (0.2, 0.7, 1.0, and 1.2) to observe how creativity parameters affect their responses.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Why This Matters</h2>
          <p>
            Large Language Models are increasingly influential in shaping how we understand and interact with information. Their perceptions of status and value don&apos;t exist in a vacuum—they reflect the training data they&apos;ve learned from, which includes human-created content about status, wealth, and social hierarchies.
          </p>
          
          <p>
            By examining these models&apos; responses, we gain insight into:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The biases and value systems encoded in modern AI systems</li>
            <li>How different models prioritize traditional vs. contemporary status markers</li>
            <li>The consensus (or lack thereof) among AI systems about social status</li>
            <li>How temperature settings affect the diversity and creativity of responses</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Collection</h2>
          <p>
            The dataset includes responses from multiple frontier models across various temperature settings, resulting in thousands of individual status symbol ratings. Each response includes the item description, numerical rating, model name, and temperature setting used.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Open Source</h2>
          <p>
            This project is completely open source. All data, analysis code, and the web interface are available on GitHub.
          </p>

          <p className="text-sm text-muted-foreground mt-8 pt-4 border-t">
            Created by <a href="https://x.com/joonaheino" target="_blank" className="text-blue-600 hover:underline">@joonaheino</a>
          </p>
        </div>
      </div>
    </main>
  )
}