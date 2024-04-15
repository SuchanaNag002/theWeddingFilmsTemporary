"use client"
import Nav from '@/client/components/Nav/Nav'
import Projects from '@/client/pages/Projects'
import React from 'react'
import { ProjectContextProvider } from '@/context/Project_Context'

const page = () => {
  return (
    <main id="projects" className='min-h-screen w-screen overflow-hidden'>
      <ProjectContextProvider>
        <Nav />
        <Projects/>
      </ProjectContextProvider> 
    </main>
  )
}

export default page