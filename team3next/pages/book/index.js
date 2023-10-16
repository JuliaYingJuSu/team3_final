import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";
import CardR3 from "@/components/layout/card-r3";
import Link from "next/link";
import BreadcrumbIndex from "@/components/book/breadcrumb-index";

export default function Index() {
  // useState
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // node
  useEffect(() => {
    fetch("http://localhost:3002/api/book", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);
        const groupedData = {};
        data.forEach(({ restaurant_id, ...rest }) => {
          if (groupedData[restaurant_id]) {
            groupedData[restaurant_id].food_tag_names.push(rest.food_tag_name);
          } else {
            groupedData[restaurant_id] = {
              restaurant_id,
              ...rest,
              food_tag_names: [rest.food_tag_name],
            };
          }
        });

        const dataWithFirstImages = Object.values(groupedData).map((item) => {
          if (Array.isArray(item.r_img_route)) {
            item.r_img_route = item.r_img_route[0];
          }
          return item;
        });

        dataWithFirstImages.sort((a, b) => b.restaurant_id - a.restaurant_id);

        setData(dataWithFirstImages);
        setDisplayData(dataWithFirstImages);
      })
      .catch((ex) => console.log(ex));
  }, []);

  // 搜尋功能
  useEffect(() => {
    let newData = data
      .filter((city) => {
        if (selectedCity) {
          if (selectedCity === "不分地區") {
            return true;
          } else {
            return city.restaurant_city === selectedCity;
          }
        } else {
          return true; // 如果没有選擇城市，不過濾城市
        }
      })
      .filter((restaurant) => {
        if (searchKeyword) {
          // 使用 includes 方法檢查標題或標籤是否包含關鍵字（不區分大小寫）
          return (
            restaurant.restaurant_name
              .toLowerCase()
              .includes(searchKeyword.toLowerCase()) ||
            restaurant.food_tag_name
              .toLowerCase()
              .includes(searchKeyword.toLowerCase()) ||
            restaurant.restaurant_info
              .toLowerCase()
              .includes(searchKeyword.toLowerCase()) ||
            restaurant.restaurant_district
              .toLowerCase()
              .includes(searchKeyword.toLowerCase()) ||
            restaurant.restaurant_address
              .toLowerCase()
              .includes(searchKeyword.toLowerCase())
          );
        } else {
          return true; // 如果没有輸入搜索關鍵字，不過濾關鍵字
        }
      });

    setDisplayData(newData);
  }, [selectedCity, searchKeyword]);

  // handle
  const handleCityChange = (e) => {
    setSelectedCity(e.target.innerText);
  };
  const handleTagSelect = (e) => {
    setSearchKeyword(e.target.innerText);
  };
  const handleSearch = (e) => {
    setDisplayData(e.target.innerText);
  };
  return (
    <>
      <Head>
        <title>食食嗑嗑-餐廳搜尋</title>
      </Head>
      <Navbar></Navbar>
      <div className="container">
        <BreadcrumbIndex></BreadcrumbIndex>
      </div>
      <div className="w-100 h400 d-flex justify-content-center align-items-end banner mt-5">
        <div className="row g-4" style={{ maxWidth: "830px" }}>
          {/* 縣市選單 */}
          <div className="col-12 col-lg-3 dropdown pe-3 ps-4">
            <button
              className="btn dropdown-toggle btn-lg middle locat-b w-100"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="icon-map fs-5 pe-2 fw-bold"></span>
              {selectedCity || "不分地區"}
            </button>
            <ul className="dropdown-menu">
              <li className="dropdown-item" onClick={handleCityChange}>
                不分地區
              </li>
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
          {/* 搜尋條 */}
          <div className="col-lg-9">
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
            {/* toggle */}
            {/* <div className="ms-4 mt-1 fs16 d-flex">
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
            </div> */}
          </div>
        </div>
      </div>
      {/* foodtag標籤 */}
      <div className="cellp container d-flex justify-content-center mt-4 mb-5">
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}
        >
          台式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}
        >
          中式
        </button>
        <button
          type="button"
          className="btn  btn-sm tags"
          onClick={handleTagSelect}
        >
          日式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}
        >
          韓式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}
        >
          港式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}
        >
          美式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}
        >
          義式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}
        >
          越式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}
        >
          西式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}
        >
          泰式
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}
        >
          早餐
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}
        >
          午餐
        </button>
        <button
          type="button"
          className="btn btn-sm tags"
          onClick={handleTagSelect}
        >
          晚餐
        </button>
      </div>
      {/* <div className="container d-flex justify-content-center">
        <div className="d-flex" style={{ width: "80%" }}>
          <h5 className="fw-bolder">日式</h5>
          <h6 className="align-self-end ms-2">{displayData.length} 筆結果</h6>
        </div>
      </div> */}
      <div style={{ marginTop: "60px" }}>
        {displayData.map(
          ({
            restaurant_id,
            restaurant_name,
            restaurant_city,
            restaurant_district,
            restaurant_address,
            restaurant_phone,
            restaurant_info,
            r_img_route,
            food_tag_names,
            restaurant_opening,
          }) => {
            return (
              <CardR3
                key={restaurant_id}
                restaurant_id={restaurant_id}
                restaurant_name={restaurant_name}
                restaurant_city={restaurant_city}
                restaurant_district={restaurant_district}
                restaurant_address={restaurant_address}
                restaurant_phone={restaurant_phone}
                restaurant_info={restaurant_info}
                r_img_route={r_img_route}
                food_tag_names={food_tag_names}
                restaurant_opening={restaurant_opening}
              />
            );
          }
        )}
      </div>
      <Link href={"/"} className="middle grey fs18b mt-5 py-3 mb-4">
        看更多
      </Link>
      <Footer></Footer>
      <style jsx>
        {`
          .form-check-input:checked {
            background-color: #869aaa;
            border-color: #869aaa;
          }
          .tags {
            border-radius: 40px;
            border: 0.5px solid;
            margin-right: 5px;
          }
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
          @media screen and (max-width: 500px) {
            .searchbar {
              display: flex;
              width: 360px;
              height: 40px;
              padding: 0px 5px;
              flex-direction: column;
              align-items: center;
              gap: 8px;
            }
            .search-banner:before {
              position: absolute;
              right: 25px;
              top: 9px;
            }
            .tags {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
}
