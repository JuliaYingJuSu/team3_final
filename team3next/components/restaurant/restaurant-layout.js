import React from "react";
import RestaurantSidebar from "./sidebar";
import RestaurantNavbar from "./navbar";
import Footer from "../layout/default-layout/footer";

export default function RestaurantLayout({ children }) {
  return (
    <>
      <section className="d-flex" style={{ height: "1000px" }}>
        <div
          className="h-100"
          style={{ backgroundColor: "#EFD6C5", width: "250px" }}
        >
          <div className="row">
            <RestaurantSidebar />
          </div>
        </div>
        <section className="d-flex flex-column w-100">
          <RestaurantNavbar />
          <div className="container">
            <div className="col-12 w-100">
              <div className="row">{children}</div>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}
