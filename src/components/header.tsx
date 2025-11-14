'use client'

import Link from 'next/link'
import { Github } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-6 md:px-12 flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          Status LLMs
        </Link>

        <nav className="flex items-center gap-8">
          <Link href="/about" className="text-sm hover:text-foreground/80 transition-colors">
            About
          </Link>
          <Link href="/analysis" className="text-sm hover:text-foreground/80 transition-colors">
            Analysis
          </Link>
          <div className="flex items-center gap-4 border-l pl-6">
            <a
              href="https://x.com/joonaheino"
              target="_blank"
              className="text-sm hover:text-foreground/80 transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://github.com/lurnake/status-llms"
              target="_blank"
              className="flex items-center gap-2 text-sm hover:text-foreground/80 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
