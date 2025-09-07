import React from 'react'
import ProjectCard from './ProjectCard'

export default function Project() {

  const projects = [
    {
      id: 1,
      title: "Ngự Trù của Bạo Chúa",
      subtitle: "Bon Appétit, Your Majesty",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1887&auto=format&fit=crop",
      meta: ["Node.js", "React", "Tailwind", "MongoDB"],
      rank: 1
    },
    {
      id: 2,
      title: "Tử Dạ Quy",
      subtitle: "Moonlit Reunion",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1887&auto=format&fit=crop",
      meta: ["PHP", "MySQL", "Laravel", "Docker"],
      rank: 2
    },
    {
      id: 3,
      title: "Hiến Ngư",
      subtitle: "When Destiny Brings The Demon",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1887&auto=format&fit=crop",
      meta: ["React", "Tailwind", "Next.js", "TypeScript"],
      rank: 3
    },
    {
      id: 4,
      title: "Thanh Gươm Diệt Quỷ",
      subtitle: "Demon Slayer",
      image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1887&auto=format&fit=crop",
      meta: ["Nest.js", "Prisma", "PostgreSQL", "Docker"],
      rank: 4
    },
    {
      id: 5,
      title: "Cẩm Nguyệt Như Ca",
      subtitle: "Legend of the Female General",
      image: "https://images.unsplash.com/photo-1535241749838-299277b6305f?q=80&w=1887&auto=format&fit=crop",
      meta: ["React", "Tailwind", "Next.js", "TypeScript"],
      rank: 5
    }
  ]
  return (
    <section className="container mx-auto px-4 overflow-x-hidden">
      <h2 className="text-2xl font-bold text-center my-10">Featured Projects</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5 my-10">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            corner={idx % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>      
    </section>
  )
}
