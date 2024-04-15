import Image from "next/image"

const ProjectSection = () => {
  return (
    <div className=' grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 bg-black text-white min-h-[60vh] w-screen overflow-hidden'>
      <div className="flex-center h-full w-full">
        <div className=" relative -rotate-12 ">
            <Image 
              className=" hover:-rotate-12 transition-all ease-linear duration-200"
              src="/bride_home.jpg"
              height={400}
              width={250}
            />
            <div className="absolute hover:-rotate-12 transition-all ease-linear duration-200 h-full w-[150%] blur-3xl bg-pink-500 top-0 -left-1/4 -z-10"></div>
          </div>
      </div>
      <div className="flex-center flex-col gap-6 w-full h-full py-8 px-10">
            <h1 className="text-4xl text-center md:text-left my-2 ">
              Showcased Splendours : A Glimpse Into My Artistry
            </h1>
            <p className=" text-lg text-center md:text-left">
              Wander through our gallery, a collection of moments woven with love and the magic of Indian weddings. Here, stolen glances simmer with unspoken promises, vibrant flowers bloom in a kaleidoscope of colors, and laughter dances on the wind like sparkling fireflies. Lose yourself in the whirlwind of emotions that paint every Indian wedding ceremony. 
            </p>
            <a
                className="px-6 py-4 md:self-start rounded-xl gradient-primary hover:scale-105"
                href="/booking"
            >
                My Stories
            </a>
      </div>
    </div>
  )
}

export default ProjectSection