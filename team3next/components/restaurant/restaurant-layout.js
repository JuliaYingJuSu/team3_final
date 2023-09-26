import React from "react";
import RestaurantSidebar from "./restaurant-sidebar";
import RestaurantNavbar from "./restaurant-navbar";
import Footer from "../layout/default-layout/footer";

export default function RestaurantLayout({ children }) {
  return (
    <>
      <section className="d-flex w-100" style={{ height: "1000px" }}>
      <div className="row">
        <aside className="col-2 h-100 position-fixed"
          style={{ backgroundColor: "#EFD6C5", width: "250px" }}
        >
          <div className="row">
            <RestaurantSidebar />
          </div>
        </aside>
        <div className="row">
          <div className="col-12 w-100" style={{marginLeft: "250px" }}>
            <nav
              className="bg-white position-fixed w-100"
            >
              <RestaurantNavbar />
            </nav>
            <section className="container-fluid d-flex w-100"
              style={{ marginTop: "150px"}}
            >
              <div className="row">
                <div className="col-12">{children}</div>
              </div>
            </section>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
