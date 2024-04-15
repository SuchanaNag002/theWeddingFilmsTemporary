"use client"
import videoData from "../components/videography/video_constants"
import VideoCard from "../components/videography/VideoCard"

const VideographyPage = () => {
  return (
    <div className="relative min-h-screen w-full top-0 left-0">
      <div className=" h-screen w-screen flex items-end justify-center">
        <video
          autoPlay
          muted
          loop={true}
          controls={false}
          src="videography_demo.mp4"
          alt="Background"
          className="BACKGROUND_IMAGE fixed top-0 left-0 -z-10 max-h-screen w-full h-full  max-w-screen object-cover  bg-fixed"
        />
      </div>
      <div className='relative -translate-y-[50vh] left-0 min-h-[100vh] w-[100vw] bg-transparent text-white'>
        <div className="relative z-[30] mb-32">
          <h1 className="text-3xl md:text-6xl text-center my-2 p-4">
            Professional Videography
          </h1>
          <h1 className=" text-2xl md:text-4xl text-center my-2 p-4">
          Love. Laughter. Captured Forever. Yours Next?
          </h1>
        </div>
        <div className="min-h-[50vh] bg-black">
          {
            videoData.map((vid,i)=><VideoCard vid={vid} key={i} />)
          }
        </div>
      </div>
    </div>
  )
}

export default VideographyPage