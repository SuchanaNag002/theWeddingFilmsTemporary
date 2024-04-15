
import GalleryPage from '@/client/pages/GalleryPage'
import React from 'react'

const page = ({params}) => {
  const gallery_name = decodeURIComponent(params.gallery_name)
  return (
    <main className='min-h-screen w-screen overflow-hidden'>
        <GalleryPage name={gallery_name} />
    </main>
  )
}

export default page