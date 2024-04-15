import React from "react";

const Welcome = () => {
  return (
    <div className="bg-beige text-black">
      <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 h-max w-full m-0">
        <div className="bg-container p-4 py-2 md:py-24 flex items-center md:ml-16 md:items-start justify-center flex-col">
          <h1 className="text-5xl my-8 font-medium text-center md:text-left">
            HEY THERE!
          </h1>
          <div className="mb-8">
            <h1 className="text-3xl">WELCOME TO MY PORTFOLIO</h1>
          </div>
        </div>
        <div className="p-4 py-2 lg:pr-6 md:py-24 ml-[-10px] md:ml-0 flex items-center justify-center flex-col md:pr-6">
          <p className="text-lg leading-loose">
            Time, although continuous, is momentary. It passes, yet its shadow
            lingers. At WeddingNama, we document these fleeting moments that can
            reside in your memory lane for eternity, moments that evoke
            emotions, moments that you can tuck away in your hearts forever.
            Moments that make you feel!
          </p>
          <p className="text-lg leading-loose mt-4">
            With our in-house dynamic team of skilled photographers,
            cinematographers, & editors, we specialize in photography and
            filming of luxurious, destination weddings. We are leaving our
            footprints around the world, one wedding at a time!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
