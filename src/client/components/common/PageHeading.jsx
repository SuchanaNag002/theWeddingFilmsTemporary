import React from "react";

const PageHeading = ({ heading, description, headingSize }) => {
  return (
    <div className="p-4 my-10 flex flex-col items-center justify-center">
      <h1
        className={`my-10 sm:my-10 text-center font-bold \
            ${
              headingSize ? headingSize : " text-4xl sm:text-6xl lg:lext-6xl "
            }`}
      >
        {heading}
      </h1>
      <div className="w-1/3 md:w-1/6 my-10 sm:my-16">
        <hr className="border-solid border-2 border-black"></hr>
      </div>
      <p className="text-xl text-slate-400 text-center my-6 p-2 sm:p-4 md:w-1/2">
        {description}
      </p>
      <div className="w-1/3 md:w-1/6 my-10 sm:my-16">
        <hr className="border-solid border-2 border-black"></hr>
      </div>
    </div>
  );
};

export default PageHeading;
