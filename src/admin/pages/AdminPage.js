import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import EditProject from "../components/menus/EditProjectItems/EditProject";
import AddProject from "../components/menus/AddProjectItems/AddProject";
import EditAboutMe from "../components/menus/EditAboutMe";
import EditGallery from "../components/menus/EditGalleryItems/EditGallery";

const handlePageChange = (page) => {
  if (page == "AddProject") {
    return <AddProject />;
  } else if (page == "EditProject") {
    return <EditProject />;
  } else if (page == "EditGallery") {
    return <EditGallery />;
  } else if (page == "EditAboutMe") {
    return <EditAboutMe />;
  } else {
    return <EditProject />;
  }
};

const AdminPage = (props) => {
  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-w-scroll flex sm:flex-row-reverse flex-col">
      <div className="w-screen h-[90vh] sm:w-full sm:min-h-screen p-16 overflow-y-scroll">
        {handlePageChange(props.menu)}
      </div>
      <div className="w-screen sm:w-1/6 bg-black rounded-lg">
        <AdminSidebar menu={props.menu} />
      </div>
    </div>
  );
};

export default AdminPage;
