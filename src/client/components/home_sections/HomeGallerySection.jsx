import Image from "next/image"

const HomeGallerySection = () => {
  return (
    <div className='w-full py-20'>
        <h1 className='uppercase bg-primary text-4xl text-center text-black py-10'>My Gallery</h1>
        <div className='flex items-center justify-around flex-col md:flex-row flex-wrap h-full w-full'>
            <div id="pre-wedding"
                className="p-4 "        
            >
                <Image
                    src="/bride_home.jpg"
                    className="mt-10 mb-5 md:my-5 shadow-md" 
                    alt="pre-wedding"
                    width={350}
                    height={400}
                />
                <div className="text-2xl font-bold flex-center w-full text-black">
                    Pre-Wedding
                </div>
            </div>
            <div id="wedding rite"
                className="p-4 "        
            >
                <Image
                    alt="wedlock"
                    src="/indian_bride.jpg"
                    className="mt-10 mb-5 md:my-5 shadow-md"
                    width={350}
                    height={400}
                />
                <div className="text-2xl font-bold flex-center w-full text-black">
                    Wedlock Rites
                </div>
            </div>
            <div id="wedding"
                className="p-4 "        
            >
                <Image
                    alt="wedding"
                    src="/wedding_home.jpg"
                    className="mt-10 mb-5 md:my-5 shadow-md"
                    width={350}
                    height={400}
                />
                <div className="text-2xl font-bold flex-center w-full text-black">
                    Wedding
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeGallerySection