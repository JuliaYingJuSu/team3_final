import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/default-layout/navbar-main";
import styles from "./index.module.css";
import Bread from "@/components/product/bread";
import Footer from "@/components/layout/default-layout/footer";
import { Form } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";

export default function index() {
  const [data, setData] = useState([]);

  // const a = () => {
  //   const b = document.querySelector("#leftBox");
  //   // b.classList.add("display");
  //   // };
  //   console.log(b);
  // };

  useEffect(() => {
    // axios.get("");

    fetch("http://localhost:3002/product")
      .then((r) => r.json())
      .then((data) => {
        setData(data);
        console.log(data[0]);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <Bread />
        <div className="w-100 d-flex mb-3">
          <main className="w-100 d-flex">
            <div id="leftBox" className={styles.leftBox}>
              <div className={styles.left}>
                <Link href="#/product">
                  <button className={styles.leftA + " btn"} type="button">
                    全部商品
                  </button>
                </Link>
                <button
                  className="btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#type1"
                  aria-expanded="false"
                  aria-controls="type1">
                  飲品/沖泡類{" "}
                  <span className="fs-6 ms-2 icon-arrow-down"></span>
                </button>
                <div className="collapse" id="type1">
                  <button className={styles.typeListBtn + " btn"} type="button">
                    茶類
                  </button>
                  <button className={styles.typeListBtn + " btn"} type="button">
                    咖啡/咖啡豆
                  </button>
                  <button className={styles.typeListBtn + " btn"} type="button">
                    果汁
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button">
                    醋/水果醋
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button">
                    酒類
                  </button>
                </div>
                <button
                  className="btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#type2"
                  aria-expanded="false"
                  aria-controls="type2">
                  烘焙食品/甜點{" "}
                  <span className="fs-6 ms-2 icon-arrow-down"></span>
                </button>
                <div className="collapse" id="type2">
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button">
                    蛋糕/派
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button">
                    手工餅乾
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button">
                    麵包/吐司
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button">
                    奶酪/布丁/果凍
                  </button>
                </div>
                <button
                  className="btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#type3"
                  aria-expanded="false"
                  aria-controls="type3">
                  休閒零食 <span className="fs-6 ms-2 icon-arrow-down"></span>
                </button>
                <div className="collapse" id="type3">
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button">
                    零食
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button">
                    糖果/巧克力
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button">
                    果醬/抹醬
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button">
                    果醬/抹醬
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button">
                    堅果/穀物
                  </button>
                </div>
                <button
                  className="btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#type4"
                  aria-expanded="false"
                  aria-controls="type4">
                  烹料料理 <span className="fs-6 ms-2 icon-arrow-down"></span>
                </button>
                <div className="collapse" id="type4">
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button">
                    熟食/冷藏、冷凍食品
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button">
                    米/麵條
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button">
                    調理包/料理包
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button">
                    調味料/醬料
                  </button>
                </div>
                <button
                  className="btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#type5"
                  aria-expanded="false"
                  aria-controls="type5">
                  其他 <span className="fs-6 ms-2 icon-arrow-down"></span>
                </button>
                <div className="collapse" id="type5">
                  <button
                    className={styles.typeListBtn + " btn  "}
                    type="button">
                    其他
                  </button>
                </div>
              </div>
              <div className={styles.left}>
                <p className="h6 px-2 pb-3">價格範圍</p>

                <Form className="d-flex flex-column px-2 justify-content-start">
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="300以下"
                        name="price"
                        type={type}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="300 - 500"
                        name="price"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="500 - 800"
                        name="price"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="800 - 1000"
                        name="price"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="1000以上"
                        name="price"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                    </div>
                  ))}
                </Form>
              </div>
              <div className={styles.left}>
                <p className="h6 px-2 pb-3">篩選條件</p>
                <form className="d-flex flex-column px-2">
                  <label>
                    <input
                      className="mb-4"
                      type="checkbox"
                      name="priceType1"
                      id="priceType1"
                    />
                    無麩質
                  </label>
                  <label>
                    <input
                      className="mb-4"
                      type="checkbox"
                      name="priceType2"
                      id="priceType2"
                    />
                    素食可用
                  </label>
                  <label>
                    <input
                      className="mb-4"
                      type="checkbox"
                      name="priceType3"
                      id="priceType3"
                    />
                    無添加
                  </label>
                </form>
              </div>
            </div>

            <div className="container">
              <div
                className={
                  styles.sort +
                  " row d-flex justify-content-end align-items-center"
                }
              >
                <Dropdown className=" col-auto me-auto">
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className={styles.barBtn + " p-1 btn-small border-0 "}
                  >
                    分類
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <select
                  class=" col-2 form-select form-select-sm"
                  aria-label="Small select example"
                >
                  <option selected>排序</option>
                  <option value="1">最新商品</option>
                  <option value="2">價格高到低</option>
                  <option value="3">價格低到高</option>
                </select>
                <form class="col-auto d-flex " role="search">
                  <input
                    class="form-control me-1"
                    type="search"
                    placeholder="搜尋"
                    aria-label="Search"
                  />
                  <button class="btn icon-search" type="submit"></button>
                </form>
              </div>

              <div className="row mb-3 d-flex justify-content-center align-items-center">
                {data.map(
                  (
                    {
                      product_id,
                      product_name,
                      price,
                      product_description,
                      specification,
                      product_type_id,
                      product_type_list_id,
                      isValid,
                    },
                    i
                  ) => {
                    console.log(product_id);
                    return (
                      <div
                        key={product_id}
                        className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-3 d-flex justify-content-center align-items-center "
                      >
                        <div className={styles.cardP}>
                          <div className={styles.imgBox}>
                            <img
                              src="images/product/螢幕擷取畫面 2023-09-26 101926.png"
                              alt=""
                              className="w-100 h-100 object-fit-cover "
                            />
                          </div>
                          <div className=" px-2 w-100 d-flex justify-content-between pt-2 pb-2">
                            <span>{product_name}</span>
                            <span className="icon-mark"></span>
                          </div>
                          <div
                            className=" px-2 w-100
                     d-flex justify-content-between pt-2 pb-2"
                          >
                            <span>{"NT$" + price}</span>
                            <span className="icon-cark"></span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
