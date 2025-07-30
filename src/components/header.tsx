'use client'

import Link from 'next/link'
import { BrainCircuit, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <BrainCircuit className="h-6 w-6" />
            <span className="font-bold">Status LLMs</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://x.com/joonaheino" target="_blank">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="sr-only">Joona Heino on X</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/your-repo/status-llms" target="_blank">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
