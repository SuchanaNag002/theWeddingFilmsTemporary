import ProjectPage from '@/client/pages/ProjectPage'
import React from 'react'

const page = ({params}) => {
  return (
    <main className='min-h-screen w-screen overflow-hidden'>
        <ProjectPage projectId={params.projectId} />
    </main>
  )
}

export default page