import AddPost from "@/components/post/add-post";
import React from "react";
import Navbar from "@/components/layout/default-layout/navbar-main";
import Footer from "@/components/layout/default-layout/footer";

export default function NewPost() {
  return (
    <>
      <Navbar />
      <AddPost />
      <Footer />
    </>
  );
}
