import React from "react";
import RestaurantSidebar from "./restaurant-sidebar";
import RestaurantNavbar from "./restaurant-navbar";
import Footer from "../layout/default-layout/footer";

export default function RestaurantLayout({ children }) {
  return (
    <>
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
          <div className="container">
            <nav className="bg-white sticky-top">
              <RestaurantNavbar />
            </nav>
            <section className="w-100 mt-5">{children}</section>
          </div>
        </div>
      </section>
    </>
  );
}
