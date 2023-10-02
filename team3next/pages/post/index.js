import React from "react";
import Navbar from "@/components/layout/default-layout/navbar-main";
import Breadcrumb from "@/components/post/breadcrumb";
import Banner from "@/components/post/banner";
import Footer from "@/components/layout/default-layout/footer";
import Articles from "@/components/post/articles";
Articles;

export default function index() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Breadcrumb />
      </div>
      <Banner />
      <Articles />
      <Footer />
    </>
  );
}
