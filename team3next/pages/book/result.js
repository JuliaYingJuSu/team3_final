import Head from "next/head";
import Navbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";
import LocationSelect from "@/components/layout/location-select";
import CardR3 from "@/components/layout/card-r3";
import Link from "next/link";

export default function Index() {
  return (
    <>
      <Head>
        <title>食食嗑嗑-餐廳搜尋</title>
      </Head>
      <Navbar></Navbar>
      <div className="w-100 h400 d-flex align-items-end banner">
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
            <div className="ms-4 mt-1 fs16 d-flex">
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
      <div className="container d-flex justify-content-center mt-3 mb-5">
        {/* 標籤 */}
        <button type="button" className="btn btn-sm tags">
          台式
        </button>
        <button type="button" className="btn btn-sm tags">
          中式
        </button>
        <button type="button" className="btn  btn-sm tags">
          日式
        </button>
        <button type="button" className="btn btn-sm tags">
          韓式
        </button>
        <button type="button" className="btn btn-sm tags">
          港式
        </button>
        <button type="button" className="btn btn-sm tags">
          美式
        </button>
        <button type="button" className="btn btn-sm tags">
          義式
        </button>
        <button type="button" className="btn btn-sm tags">
          法式
        </button>
        <button type="button" className="btn btn-sm tags">
          西式
        </button>
        <button type="button" className="btn btn-sm tags">
          泰式
        </button>
        <button type="button" className="btn btn-sm tags">
          越式
        </button>
        <button type="button" className="btn btn-sm tags">
          早餐
        </button>
        <button type="button" className="btn btn-sm tags">
          早午餐
        </button>
      </div>
      <div className="d-flex mb-5" style={{ marginLeft: "420px" }}>
        <h5 className="fw-bolder">火鍋</h5>
        <h6 className="align-self-end ms-2">(10篇)</h6>
      </div>
      <CardR3></CardR3>
      <CardR3></CardR3>
      <CardR3></CardR3>
      <CardR3></CardR3>
      <CardR3></CardR3>
      <Link href={"/"} className="middle grey fs18b mt-5 py-3 mb-4">
        看更多
      </Link>
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
          .tags {
            border-radius: 40px;
            border: 0.5px solid;
            margin-right: 5px;
          }
        `}
      </style>
    </>
  );
}
