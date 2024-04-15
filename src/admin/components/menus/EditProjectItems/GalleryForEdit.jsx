import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { MdClose, MdSearch } from "react-icons/md";
import "../../../../commons/Gallery.css";
import { useState } from "react";
import YouTube from "react-youtube";

const Gallery = ({ ...props }) => {
  const mediaArray = [
    ...(props.unsavedImageUrlsArray ?? []),
    ...(props.unsavedVideoUrlsArray ?? []),
    ...(props.savedImageUrlsArray ?? []),
    ...(props.savedVideoUrlsArray ?? []),
  ];

  const getVideoIdFromUrl = (url) => {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
      return videoId.substring(0, ampersandPosition);
    }
    return videoId;
  };

  const [displayImage, setDisplayImage] = useState(null);

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
              {media.type === "video" ? (
                <div className="gallery-media">
                  <YouTube
                    videoId={getVideoIdFromUrl(media.src)}
                    title={media.name}
                    opts={{
                      width: "95",
                      height: "100",
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
                  src={media.src}
                  alt={media.name}
                  loading="lazy"
                  width={"300px"}
                />
              )}
              <div
                onClick={() =>
                  props.deleteMediaFunction(
                    props.currentCategoryIndex,
                    props.setCategories,
                    media
                  )
                }
                className="gallery-media-delete absolute top-0 right-0 p-2
                            z-10 text-xl rounded-full bg-red-500 text-white"
              >
                <MdClose />
              </div>
              <div
                onClick={() => {
                  setDisplayImage({ media, index });
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
      {displayImage && (
        <div className="fixed bg-black center z-50 top-0 left-0 h-screen w-screen text-white text-2xl p-4 font-sans overflow-y-scroll">
          <div className="h-1/6 w-full flex items-center justify-between">
            <h1>
              {displayImage.index + 1}/{mediaArray.length}
            </h1>
            <button
              onClick={() => setDisplayImage(null)}
              className="text-4xl rounded-full bg-red-500 text-white"
            >
              <MdClose />
            </button>
          </div>
          <div className="h-5/6 w-full flex items-center justify-center">
            {displayImage && displayImage.media.type === "video" ? (
              <YouTube
                className="gallery-media"
                videoId={getVideoIdFromUrl(displayImage.media.src)}
                title={displayImage.media.name}
                opts={{ playerVars: { autoplay: 1 } }}
                onReady={(event) => {
                  event.target.playVideo();
                }}
              />
            ) : (
              <img
                src={displayImage.media.src}
                alt={displayImage.media.alt}
                className="m-2 p-4 max-h-[90%] max-w-[80%]"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
