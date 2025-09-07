// src/components/footer/Footer.jsx
import logo from "@/assets/images/logo.png"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-white/80 backdrop-blur dark:bg-gray-900/80">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* top: 4 cột trên md, tự xếp 1-2 cột trên mobile */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* brand */}
          <div>
            <a href="/" className="inline-flex items-center gap-2">
              <img src={logo} alt="logo" className="h-10 w-10" />
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                MyApp
              </span>
            </a>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Build cool stuff with React & Tailwind. Clean, minimal, responsive.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/your" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com/your" aria-label="Twitter / X">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://linkedin.com/in/your" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:you@example.com" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div></div>

          <div></div>

          {/* newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Get updates about new projects and articles.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex max-w-sm gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
              />
              <Button type="submit" className="shrink-0">Subscribe</Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        {/* bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 text-sm text-gray-500 dark:text-gray-400 md:flex-row">
          <p>© {year} MyApp. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#terms" className="hover:underline">Terms</a>
            <a href="#privacy" className="hover:underline">Privacy</a>
            <a href="#cookies" className="hover:underline">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
