// src/components/navbar/Navbar.jsx
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import logo from "@/assets/images/logo.png"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur dark:bg-gray-900/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <a href="/" className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-100">
          <img src={logo} alt="logo" className="w-10 h-10" />
        </a>

        {/* Actions desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="ml-6 flex gap-2">
            <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium 
                text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 
                dark:hover:bg-gray-800 
                dark:hover:text-white transition-colors"
            >
                Home
            </a>
            <a
                href="#project"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 
                hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200
                 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
            >
                Project
            </a>
            <a
                href="#about"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700
                 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 
                 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
            >
                About
            </a>
          </div>
        </nav>

       {/* Mobile menu */}
        <div className="md:hidden">
        <Sheet>
            <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
            </Button>
            </SheetTrigger>

            {/* Thu hẹp chiều rộng + bỏ padding mặc định để tự kiểm soát */}
            <SheetContent
            side="left"
            className="w-[84vw] sm:w-80 p-0"
            style={{
                paddingTop: "env(safe-area-inset-top)",
                paddingBottom: "env(safe-area-inset-bottom)",
            }}
            >
            {/* Header nhỏ cho menu, có border và khoảng cách */}
            <div className="flex h-14 items-center border-b px-4">
                <span className="text-sm font-semibold">Menu</span>
            </div>

            {/* Nav items có padding xung quanh, item block + hover background */}
            <nav className="px-2 py-4">
                <a href="#" className="block rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted">
                    Home
                </a>
                <a href="#project" className="block rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted">
                Project
                </a>
                <a href="#about" className="block rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted">
                About
                </a>

                <div className="my-3 h-px bg-border" />

                {/* Actions full width + đủ khoảng cách */}
                {/* <div className="space-y-2 px-2">
                <Button variant="ghost" className="w-full">Contact</Button>
                <Button className="w-full">Download CV</Button>
                </div> */}
            </nav>
            </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  )
}
