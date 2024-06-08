import Image from "next/image"
import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";
import { satisfy_font } from "../fonts/font-classnames";

const AboutMe = () => {
  return (
    <div className=' grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 bg-primary text-black min-h-[60vh] w-screen overflow-hidden'>
        <div className=" flex-center flex-col gap-6 w-full h-full pt-10 md:py-20">
            <Image
                src="/back.webp"
                height={300}
                width={300}
                alt="Photographer profile picture"
            />
            {/* <div className="flex justify-center gap-6 space-x-4 mt-4">
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
            </div> */}
        </div>
        <div className="flex-center flex-col gap-6 w-full h-full py-8 px-10">
            <h1 className={`text-6xl text-center my-2 ${satisfy_font.className}`} >
                {"Forever begins with a single frame."}
            </h1>
            <div className="flex justify-center gap-6 space-x-4 mt-8">
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

    </div>
  )
}

export default AboutMe