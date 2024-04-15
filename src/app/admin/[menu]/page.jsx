import AdminPage from '@/admin/pages/AdminPage'
import React from 'react'

const page = ({params}) => {
  return (
    <div>
        <AdminPage menu={params.menu ? params.menu : "AddEditProject" } />
    </div>
  )
}

export default page