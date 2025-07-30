'use client'

export function Footer() {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-sm leading-loose text-muted-foreground max-w-2xl">
            A research project by{' '}
            <a
              href="https://x.com/joonaheino"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Joona Heino
            </a>
            . The source code is available on{' '}
            <a
              href="https://github.com/your-repo/status-llms"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
