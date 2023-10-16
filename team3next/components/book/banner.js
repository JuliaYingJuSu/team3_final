import LocationSelect from "../layout/location-select";
import SearchBar from "../layout/search-bar";
import Link from "next/link";

export default function Banner() {
  return (
    <>
      <div className="w-100 h400 d-flex align-items-end banner pdb-50">
        <div className="container d-flex justify-content-center">
          <div className="dropdown ms-5 pe-4">
            {/* 縣市下拉選單 */}
            <div className="dropdown ms-5 pe-4">
              <div>
                <button
                  className="btn dropdown-toggle btn-lg middle locat-b"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="icon-map fs-5 pe-2 fw-bold"></span>
                  {selectedCity || "不分地區"}
                </button>
                <ul className="dropdown-menu">
                  <li className="dropdown-item" onClick={handleCityChange}>
                    台北市
                  </li>
                  <li className="dropdown-item" onClick={handleCityChange}>
                    新北市
                  </li>
                  <li className="dropdown-item" onClick={handleCityChange}>
                    台中市
                  </li>
                  <li className="dropdown-item" onClick={handleCityChange}>
                    高雄市
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* 搜尋條 */}
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2 searchbar ps-4"
              type="search"
              placeholder="日式"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            ></input>
            <span className="icon-search search-banner"></span>
          </form>
          <Link
            href="/book/result"
            className="btn btn-lg"
            style={{ width: "80px" }}
          >
            搜尋
          </Link>
        </div>
      </div>

      <style global jsx>
        {`
          .h400 {
            height: 400px;
          }
          .banner {
            background-image: url("/images/book/banner.png");
            background-size: cover;
          }
          .pdb-50 {
            padding-bottom: 50px;
          }
          @media screen and (max-width: 500px) {
            .banner {
              height: 50px;
              background-image: none;
            }
            .pdb-50 {
              padding-bottom: 5px;
            }
          }
        `}
      </style>
    </>
  );
}
