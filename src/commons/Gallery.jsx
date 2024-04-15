import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { MdClose, MdSearch } from "react-icons/md";
import "./Gallery.css";
import { useState } from "react";
import YouTube from "react-youtube";

const Gallery = ({ imageUrlsArray, videoUrlsArray }) => {
  const mediaArray = imageUrlsArray.concat(videoUrlsArray);
  const [displayImage, SetDisplayImage] = useState(null);
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
    <div className="min-h-full w-full gallery">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 5 }}>
        <Masonry>
          {mediaArray.map((media, index) => (
            <div
              key={index}
              className="gallery-media-wrapper cursor-pointer md:m-2 p-1 shadow-around relative 
                                    flex items-center justify-center max-w-max mx-auto"
            >
              {media.includes("youtube.com") ? (
                <div className="gallery-media w-max">
                  <YouTube
                    videoId={getVideoIdFromUrl(media)}
                    title="Youtube Video"
                    opts={{
                      width: "250px",
                      playerVars: {
                      autoplay: 0,
                      },
                    }}
                    onReady={(event) => {
                      event.target.pauseVideo();
                    }}
                  />
                </div>
              ) : (
                <img
                  className="gallery-media"
                  src={media}
                  alt="Album Picture"
                  loading="lazy"
                  width={"300px"}
                />
              )}
              <div
                onClick={() => {
                  SetDisplayImage({ media, index });
                }}
                className="gallery-media-view absolute top-1/2 left-1/2 
                             -translate-y-1/2 -translate-x-1/2 p-2 z-10 text-6xl rounded-full
                            bg-transparent text-white"
              >
                <MdSearch />
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {displayImage ? (
        <div className="fixed bg-black center z-[100000] top-0 left-0 h-screen w-screen text-white text-2xl p-4 font-sans overflow-y-scroll">
          <div className="h-1/6 w-full flex items-center justify-between">
            <h1>
              {displayImage.index + 1}/{mediaArray.length}
            </h1>
            <button
              onClick={() => SetDisplayImage(null)}
              className="text-4xl rounded-full bg-red-500 text-white"
            >
              <MdClose />
            </button>
          </div>
          <div className="h-5/6 w-full flex items-center justify-center">
            {displayImage.media.includes("youtube.com") ? (
              <YouTube
                className="gallery-media"
                videoId={getVideoIdFromUrl(displayImage.media)}
                title="Youtube Video"
                opts={{ playerVars: { autoplay: 1 } }}
                onReady={(event) => {
                  event.target.playVideo();
                }}
              />
            ) : (
              <img
                src={displayImage.media}
                alt="Album Picture"
                className="m-2 p-4 max-h-[90%] max-w-[80%]"
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Gallery;
