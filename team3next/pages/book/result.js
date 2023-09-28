import Head from "next/head";
import Navbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";
import LocationSelect from "@/components/layout/location-select";

export default function Index() {
  return (
    <>
      <Head>
        <title>食食嗑嗑-餐廳搜尋</title>
      </Head>
      <Navbar></Navbar>
      <div className="w-100 h400 d-flex align-items-end banner pb-5">
        <div className="container d-flex justify-content-center">
          <div className="dropdown ms-5 pe-4">
            {/* 下拉選單 */}
            <LocationSelect />
          </div>
          <div>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2 searchbar ps-4"
                type="search"
                placeholder="火鍋"
                aria-label="Search"
              ></input>
              <span className="icon-search search-banner"></span>
            </form>
            <div className="ms-4 mt-3 fs18 d-flex">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  checked
                />
                <label className="form-check-label" for="flexRadioDefault1">
                  搜尋標籤
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input ms-1"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                />
                <label
                  className="form-check-label ms-1"
                  for="flexRadioDefault2"
                >
                  搜尋內容
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <style jsx>
        {`
          .searchbar {
            width: 655px;
            height: 60px;
            border-radius: 40px;
          }
          .search-banner {
            position: relative;
            font-size: 24px;
          }
          .search-banner:before {
            position: absolute;
            right: 25px;
            top: 18px;
          }
          .form-check-input:checked {
            background-color: #869aaa;
            border-color: #869aaa;
          }
        `}
      </style>
    </>
  );
}
