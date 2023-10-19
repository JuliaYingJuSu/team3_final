import AddPost from "@/components/post/add-post";
import React from "react";
import Navbar from "@/components/layout/default-layout/navbar-main";
import Footer from "@/components/layout/default-layout/footer";
import UserInfo from "@/components/user/user-info";
import UserNavbar from "@/components/user/user-navbar";
import AddPost1 from "@/components/post/add-post2";



export default function AddNewPost() {
  return (
    <>
      <Navbar />
      <UserInfo />
      <UserNavbar />
      {/* <AddPost/> */}
      <AddPost1/>
      <Footer />
    </>
  );
}
