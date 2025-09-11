import React, { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import axios from 'axios'

export default function Project() {
  const [projects, setProjects] = useState([])
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios.get(`${apiBaseUrl}/projects/featured`).then(res => {
      setProjects(res.data.projects)
    })
  }, [])

  return (
    <section className="container mx-auto px-4 overflow-x-hidden">
      <h2 className="text-2xl font-bold text-center my-10">Featured Projects</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5 my-10">
        {projects.map((project, idx) => (
          <ProjectCard
            key={idx + 1}
            project={project}
            index={idx + 1}
            corner={idx % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>      
    </section>
  )
}
