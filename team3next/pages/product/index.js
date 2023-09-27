import React from "react";
import Navbar from "@/components/layout/default-layout/navbar-main";
import styles from "./index.module.css";
import Bread from "@/components/product/bread";
import Footer from "@/components/layout/default-layout/footer";

export default function index() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Bread />
        <div className="w-100 d-flex mb-3">
          <main className="w-100 d-flex">
            <div className={styles.leftBox}>
              <div className={styles.left}>
                <button className="btn" type="button">
                  全部商品
                </button>
                <button
                  className="btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#type1"
                  aria-expanded="false"
                  aria-controls="type1"
                >
                  飲品/沖泡類 <span className="icon-home"></span>
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
                    type="button"
                  >
                    醋/水果醋
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button"
                  >
                    酒類
                  </button>
                </div>
                <button
                  className="btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#type2"
                  aria-expanded="false"
                  aria-controls="type2"
                >
                  烘焙食品/甜點
                </button>
                <div className="collapse" id="type2">
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button"
                  >
                    蛋糕/派
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button"
                  >
                    手工餅乾
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button"
                  >
                    麵包/吐司
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button"
                  >
                    奶酪/布丁/果凍
                  </button>
                </div>
                <button
                  className="btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#type3"
                  aria-expanded="false"
                  aria-controls="type3"
                >
                  休閒零食
                </button>
                <div className="collapse" id="type3">
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button"
                  >
                    零食
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button"
                  >
                    糖果/巧克力
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button"
                  >
                    果醬/抹醬
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button"
                  >
                    果醬/抹醬
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button"
                  >
                    堅果/穀物
                  </button>
                </div>
                <button
                  className="btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#type4"
                  aria-expanded="false"
                  aria-controls="type4"
                >
                  烹料料理
                </button>
                <div className="collapse" id="type4">
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button"
                  >
                    熟食/冷藏、冷凍食品
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button"
                  >
                    米/麵條
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button"
                  >
                    調理包/料理包
                  </button>
                  <button
                    className={styles.typeListBtn + " btn "}
                    type="button"
                  >
                    調味料/醬料
                  </button>
                </div>
                <button
                  className="btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#type5"
                  aria-expanded="false"
                  aria-controls="type5"
                >
                  其他
                </button>
                <div className="collapse" id="type5">
                  <button
                    className={styles.typeListBtn + " btn  "}
                    type="button"
                  >
                    其他
                  </button>
                </div>
              </div>
              <div className={styles.left}>
                <p className="h6 px-2 pb-3">價格範圍</p>
                <form className="d-flex flex-column px-2">
                  <label>
                    <input
                      className="mb-4"
                      type="checkbox"
                      name="priceType1"
                      id="priceType1"
                    />
                    300以下
                  </label>
                  <label>
                    <input
                      className="mb-4"
                      type="checkbox"
                      name="priceType2"
                      id="priceType2"
                    />
                    301-500
                  </label>
                  <label>
                    <input
                      className="mb-4"
                      type="checkbox"
                      name="priceType3"
                      id="priceType3"
                    />
                    501-800
                  </label>
                  <label>
                    <input
                      className="mb-4"
                      type="checkbox"
                      name="priceType4"
                      id="priceType4"
                    />
                    801-1500
                  </label>
                  <label>
                    <input
                      className="mb-4"
                      type="checkbox"
                      name="priceType5"
                      id="priceType5"
                    />
                    1500以上
                  </label>
                </form>
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

            <div className="container-fluid">
              <div
                className={
                  styles.sort + " d-flex justify-content-end align-items-center"
                }
              >
                <select
                  class="form-select form-select-sm d-inline-block"
                  aria-label="Small select example"
                >
                  <option selected>排序</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <form class="d-flex align-items-center" role="search">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="搜尋"
                    aria-label="Search"
                  />
                  <button class="btn icon-search" type="submit"></button>
                </form>
              </div>

              <div className="row mb-3 d-flex justify-content-center align-items-center">
                {Array(8)
                  .fill(1)
                  .map((v, i) => {
                    return (
                      <div
                        key={i}
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
                          <div className="nameBox px-2 w-100 d-flex justify-content-between pt-2 pb-2">
                            <span>品牌名 產品名</span>
                            <span className="icon-mark"></span>
                          </div>
                          <div
                            className="priceBox px-2 w-100
                     d-flex justify-content-between pt-2 pb-2"
                          >
                            <span>NT$ 1000</span>{" "}
                            <span className="icon-cark"></span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
