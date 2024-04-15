import Gallery from "@/admin/components/menus/EditProjectItems/GalleryForEdit";
import { useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { TfiPlus } from "react-icons/tfi";

const CategoryDetails = ({ category, index, ...props }) => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const handleAddYoutubeLink = () => {
    if (youtubeLink.trim() !== "") {
      const newYouTubeFile = {
        filename: "Youtube video",
        type: "video",
        src: youtubeLink,
        tag: "unsavedVideo",
      };

      const updatedCategory = {
        ...category,
        unsavedVideoUrls: [
          ...(category.unsavedVideoUrls || []),
          newYouTubeFile,
        ],
      };

      props.setCategories((prevCategories) => {
        const updatedCategories = [...prevCategories];
        updatedCategories[index] = updatedCategory;
        return updatedCategories;
      });

      setYoutubeLinks([...youtubeLinks, youtubeLink]);
      setYoutubeLink("");
    }
  };
  const onDrop = useCallback(
    (acceptedFiles) => {
      const updatedCategory = { ...category };

      const newFiles = acceptedFiles.map((file) => ({
        filename: file.name,
        type: "image",
        file,
        src: URL.createObjectURL(file),
        tag: "unsavedImage",
      }));

      updatedCategory.unsavedImageUrls = [
        ...(category.unsavedImageUrls || []),
        ...newFiles,
      ];

      props.setCategories((prevCategories) => {
        const updatedCategories = [...prevCategories];
        updatedCategories[index] = updatedCategory;
        return updatedCategories;
      });
    },
    [category, index, props.setCategories]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });
  function getUrl(url) {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "video";
    } else {
      return "image";
    }
  }

  // imageUrls already uploaded to database
  const savedImageUrlsArray = (category.imageUrls ?? []).map((url) => ({
    name: "Image from: " + category.name,
    src: url,
    type: getUrl(url),
    tag: "savedImage",
  }));
  //videoUrls already uploaded to database
  const savedVideoUrlsArray = (category.videoUrls ?? []).map((url) => ({
    name: "Video from: " + category.name,
    src: url,
    type: getUrl(url),
    tag: "savedVideo",
  }));
  //console.log(imageUrlsArray)//existing database imageUrls
  return (
    <div className="mt-10 mb-20 w-full shadow-around relative p-4 rounded-xl flex flex-col">
      <button
        onClick={() => {
          props.deleteCategoryFunction(
            props.setCategories,
            props.currentCategoryIndex,
          );
          props.setCurrentCategoryIndex(null);
        }}
        className="ml-auto mt-2 mb-4 py-2 px-4 text-lg rounded-xl bg-red-500 text-white"
      >
        Delete Category
      </button>
      <h1 className="text-xl text-slate-500 font-semibold mx-auto">
        Edit Details for: {category.name}
      </h1>
      <div className="my-4 p-2 w-full">
        <input
          onChange={(e) => {
            props.changeCategoryName(
              props.setCategories,
              props.currentCategoryIndex,
              e.target.value
            );
          }}
          className="py-2 px-4 w-full rounded-xl text-xl text-black font-bold bg-transparent shadow-around border-black focus:border-blue-500 border-2 border-solid outline-none"
          value={category.name}
        />
      </div>
      <div {...getRootProps({ className: "my-0" })}>
        <input {...getInputProps()} />
        <div className="max-w-screen-xl mx-auto mb-4">
          <p className="cursor-pointer mx-4 sm:mx-auto lg:w-1/2 px-2 py-2 text-lg rounded-xl bg-blue-500 text-white text-center">
            Select Or Drag Images Here
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center">
        <input
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          className="py-2 px-4 mb-2 sm:mb-0 sm:mr-2 w-full rounded-xl text-xl text-black font-bold bg-transparent shadow-around border-black focus:border-blue-500 border-2 border-solid outline-none"
          placeholder="Paste YouTube link"
        />
        <button
          onClick={handleAddYoutubeLink}
          className="py-4 px-4 bg-blue-500 text-white rounded-xl text-center"
        >
          <TfiPlus />
        </button>
      </div>
      <div className="my-2">
        <Gallery
          unsavedImageUrlsArray={category.unsavedImageUrls}
          unsavedVideoUrlsArray={category.unsavedVideoUrls}
          savedImageUrlsArray={savedImageUrlsArray}
          savedVideoUrlsArray={savedVideoUrlsArray}
          currentCategoryIndex={props.currentCategoryIndex}
          deleteMediaFunction={props.deleteImageFromForm}
          index={index}
          setCategories={props.setCategories}
        />
      </div>
    </div>
  );
};
export default CategoryDetails;
