'use client'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-sm text-muted-foreground">
            A research project by{' '}
            <a
              href="https://x.com/joonaheino"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Joona Heino
            </a>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a
              href="https://github.com/lurnake/status-llms"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Source code
            </a>
            <a
              href="/about"
              className="hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="/analysis"
              className="hover:text-foreground transition-colors"
            >
              Analysis
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
