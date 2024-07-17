import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import EditProject from "../components/menus/EditProjectItems/EditProject";
import AddProject from "../components/menus/AddProjectItems/AddProject";
import EditAboutMe from "../components/menus/EditAboutMe";
import EditGallery from "../components/menus/EditGalleryItems/EditGallery";
import AddBlog from "../components/menus/AddBlogItems/AddBlog";

const handlePageChange = (page) => {
  if (page === "AddProject") {
    return <AddProject />;
  } else if (page === "EditProject") {
    return <EditProject />;
  } else if (page === "EditGallery") {
    return <EditGallery />;
  } else if (page === "EditAboutMe") {
    return <EditAboutMe />;
  } else if (page === "AddBlog") {
    return <AddBlog />;
  } else {
    return <EditProject />;
  }
};

const AdminPage = (props) => {
  return (
    <div className="h-screen w-screen overflow-x-hidden flex sm:flex-row-reverse flex-col">
      <div className="w-screen sm:w-5/6 bg-white p-16 overflow-y-scroll">
        {handlePageChange(props.menu)}
      </div>
      <div className="w-screen sm:w-1/6 bg-black text-white sm:h-screen">
        <AdminSidebar menu={props.menu} />
      </div>
    </div>
  );
};

export default AdminPage;
