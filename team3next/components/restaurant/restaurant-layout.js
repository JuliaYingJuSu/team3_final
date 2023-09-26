import React from "react";
import RestaurantSidebar from "./restaurant-sidebar";
import RestaurantNavbar from "./restaurant-navbar";
import Footer from "../layout/default-layout/footer";

export default function RestaurantLayout({ children }) {
  return (
    <>
      <section className="d-flex w-100" style={{ height: "1000px" }}>
        <div className="row">
          <aside
            className="col-2 h-100 fixed-top"
            style={{ backgroundColor: "#EFD6C5", width: "250px" }}
          >
            <div className="row">
              <RestaurantSidebar />
            </div>
          </aside>
        </div>
        <div className="row w-100" style={{ marginLeft: "300px" }}>
          <div
            className="container"
            style={{ maxWidth: "100%" }}
          >
            <nav className="bg-white sticky-top" style={{}}>
              <RestaurantNavbar />
            </nav>
            <section
              className="d-flex w-100"
              style={{}}
            >
              <div className="row">
                <div className="col-12">{children}</div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
