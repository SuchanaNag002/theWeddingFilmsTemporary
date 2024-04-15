import React from "react";

const AdminSidebar = (props) => {
  // console.log(props.menu);
  return (
    <div className="w-full h-[10vh] sm:min-h-screen sm:h-fit bg-black p-2 flex flex-row sm:flex-col">
      <div className="hidden sm:block text-2xl font-extrabold text-white sm:my-8 text-center">
        ADMIN
      </div>
      <a
        href="/admin/AddProject"
        className={
          "ml-auto sm:ml-0 cursor-pointer p-2 sm:py-4 sm:my-4 \
            sm:px-4 rounded-xl   hover:opacity-60 hover:bg-slate-800" +
          (props.menu == "AddProject"
            ? " bg-white text-black"
            : " bg-black text-white")
        }
      >
        Add Project
      </a>
      <a
        href="/admin/EditProject"
        className={
          "ml-auto sm:ml-0 cursor-pointer p-2 sm:py-4 sm:my-4 \
            sm:px-4 rounded-xl   hover:opacity-60 hover:bg-slate-800" +
          (props.menu == "EditProject"
            ? " bg-white text-black"
            : " bg-black text-white")
        }
      >
        Edit Projects
      </a>
      <a
        href="/admin/EditGallery"
        className={
          "cursor-pointer p-2 sm:py-4 sm:my-4 sm:px-4 rounded-xl \
          hover:opacity-60 hover:bg-slate-800 " +
          (props.menu == "EditGallery"
            ? " bg-white text-black"
            : " bg-black text-white")
        }
      >
        Gallery
      </a>
      <a
        href="/"
        className="mr-auto sm:mr-0 cursor-pointer p-2 sm:py-4 sm:my-4 sm:px-4 bg-black text-white rounded-xl \
           hover:opacity-60 hover:bg-slate-800 "
      >
        Visit Website
      </a>
    </div>
  );
};
export default AdminSidebar;
