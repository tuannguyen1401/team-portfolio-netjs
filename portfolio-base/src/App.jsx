import { Navbar } from "@/components/navbar"
import { Home } from "@/components/home"
import { Project } from "@/components/project"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"

export default function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Project />
      <About />
      <Footer />
    </>
  )
}
