'use client'

import Link from 'next/link'
import { BrainCircuit, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3">
            <BrainCircuit className="h-6 w-6" />
            <span className="font-bold text-lg">Status LLMs</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 ml-8">
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/analysis" className="text-sm font-medium hover:text-primary transition-colors">
            Analysis
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <a href="https://x.com/joonaheino" target="_blank" className="flex items-center space-x-2 px-3 py-2">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="hidden sm:inline text-sm">@joonaheino</span>
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="https://github.com/lurnake/status-llms" target="_blank" className="flex items-center space-x-2 px-3 py-2">
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
