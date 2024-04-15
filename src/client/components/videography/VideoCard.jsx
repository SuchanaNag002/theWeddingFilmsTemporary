import YouTube from "react-youtube";

const VideoCard = ({vid,index}) => {
    const getVideoIdFromUrl = (url) => {
        // Extract the video ID from the YouTube URL
        const videoId = url.split("v=")[1];
        const ampersandPosition = videoId.indexOf("&");
        if (ampersandPosition !== -1) {
          return videoId.substring(0, ampersandPosition);
        }
        return videoId;
    };

    return (
        <div key={index} className=' py-24 grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 bg-black text-white min-h-[60vh] w-screen overflow-hidden'>
            <div className="max-w-full h-full p-4">
                <YouTube
                        className="p-6 max-w-full"
                        videoId={getVideoIdFromUrl(vid.videoUrl)}
                        title="Youtube Video"
                />
            </div>
            <div className="flex-center flex-col gap-6 w-full h-full py-8 px-10">
                <h1 className="text-4xl text-center md:text-left my-2 w-full">
                    {vid.title}
                </h1>
                <h1 className="text-lg text-center md:text-left text-slate-500 w-full">
                    {"6 June , 2024"}
                </h1>
                <p className=" text-lg text-center md:text-left">
                    {vid.description}    
                </p>
            </div>
        </div>
    )
}

export default VideoCard