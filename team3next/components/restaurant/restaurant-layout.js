import React from "react";
import RestaurantSidebar from "./sidebar";
import RestaurantNavbar from "./navbar";
import Footer from "../layout/default-layout/footer";

export default function RestaurantLayout({ children }) {
  return (
    <>
    <RestaurantNavbar/>
      <section
        className="d-flex justify-content-between"
        style={{ height: "1000px" }}
      >
        <div className="col-3 h-100" style={{ backgroundColor: "#EFD6C5",width:"250px" }}>
          <div className="row">
            <RestaurantSidebar />
          </div>
        </div>
        <div className="container">
          <div className="col-8 h-100">
            <div className="row">{children}</div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
