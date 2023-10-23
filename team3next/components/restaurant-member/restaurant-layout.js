import React from "react";
import RestaurantSidebar from "./restaurant-sidebar";
import RestaurantNavbar from "./restaurant-navbar";
import Head from "next/head";
import Footer from "../layout/default-layout/footer";
import PulseMascot from "./pulse";

export default function RestaurantLayout({ children }) {
  return (
    <>
      <Head>
        <title>食食嗑嗑-餐廳業者首頁</title>
      </Head>
      <section className="container-fluid d-flex w-100">
        <div className="row">
          <aside
            className="h-100 fixed-top"
            style={{ backgroundColor: "#EFD6C5", maxWidth: "250px" }}
          >
            <RestaurantSidebar />
          </aside>
        </div>
        <div className="row w-100" style={{ marginLeft: "270px" }}>
          <div className="container-fluid">
            <nav className="bg-white sticky-top z-1">
              <RestaurantNavbar />
            </nav>
            <section className="w-100 mt-5 position-relative">
              {children}
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
