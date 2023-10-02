import React from "react";
import EditPost from "@/components/post/edit-post";
import Navbar from "@/components/layout/default-layout/navbar-main";
import Footer from "@/components/layout/default-layout/footer";
import UserInfo from "@/components/user/user-info";
import UserNavbar from "@/components/user/user-navbar";

export default function EditPostPage() {
  return (
    <>
      <Navbar />
      <UserInfo />
      <UserNavbar />
      <EditPost />
      <Footer />
    </>
  );
}
