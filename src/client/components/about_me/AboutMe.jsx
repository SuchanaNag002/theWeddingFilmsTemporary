import Image from "next/image"
import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

const AboutMe = () => {
  return (
    <div className=' grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 bg-black text-white min-h-[60vh] w-screen overflow-hidden'>
        <div className=" flex-center flex-col gap-6 w-full h-full pt-10 md:py-20">
            <Image
                src="/photographer-profile.png"
                height={300}
                width={300}
                alt="Photographer profile picture"
            />
            <div className="flex justify-center gap-6 space-x-4 mt-4">
                    <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <FaInstagram className="text-xl md:text-2xl hover:text-rose-500" />
                    </a>
                    <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <FaFacebook className="text-xl md:text-2xl hover:text-rose-500" />
                    </a>
                    <a href="mailto:example@example.com">
                    <FaEnvelope className="text-xl md:text-2xl hover:text-rose-500" />
                    </a>
            </div>
        </div>
        <div className="flex-center flex-col gap-6 w-full h-full py-8 px-10">
            <h1 className="text-4xl text-center md:text-left my-2 ">
                Hi, I'm Raju, Professional Photo and Videographer
            </h1>
            <p className=" text-lg text-center md:text-left">
                Hey there! I'm Raju, a photographer and videographer who isn't afraid to get a little dirt on my lens (or maybe a whole lot, depending on the shot). I turn caffeine into creativity, laughter into lighting cues, and everyday moments into epic adventures you can see (and maybe even feel!). Buckle up, grab a virtual cup of coffee, and let's explore the world, one frame at a time!
            </p>
            <a
                className="px-6 py-4 md:self-start rounded-xl gradient-primary hover:scale-105"
                href="/booking"
            >
                Get A Quote
            </a>
        </div>

    </div>
  )
}

export default AboutMe