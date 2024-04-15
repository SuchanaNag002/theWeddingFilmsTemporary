import VideographyPage from "@/client/pages/VideographyPage"
import Nav from "@/client/components/Nav/Nav"

const page = () => {
  return (
    <main className='min-h-screen w-screen overflow-hidden '>
        <Nav/>
        <VideographyPage />
    </main>
  )
}

export default page