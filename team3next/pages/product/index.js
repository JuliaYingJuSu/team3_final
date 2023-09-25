import React from "react";
import Navbar from "@/components/layout/default-layout/navbar-main";
import styles from "./index.module.css";
import Bread from "@/components/product/bread";

export default function index() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Bread />
        <div className="w-100 d-flex ">
          <div className={styles.leftBox}>
            <div className={styles.left}>
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
                <button className={styles.typeListBtn + " btn "} type="button">
                  醋/水果醋
                </button>
                <button className={styles.typeListBtn + " btn "} type="button">
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
                <button className={styles.typeListBtn + " btn "} type="button">
                  蛋糕/派
                </button>
                <button className={styles.typeListBtn + " btn "} type="button">
                  手工餅乾
                </button>
                <button className={styles.typeListBtn + " btn "} type="button">
                  麵包/吐司
                </button>
                <button className={styles.typeListBtn + " btn "} type="button">
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
                <button className={styles.typeListBtn + " btn "} type="button">
                  零食
                </button>
                <button className={styles.typeListBtn + " btn "} type="button">
                  糖果/巧克力
                </button>
                <button className={styles.typeListBtn + " btn "} type="button">
                  果醬/抹醬
                </button>
                <button className={styles.typeListBtn + " btn "} type="button">
                  果醬/抹醬
                </button>
                <button className={styles.typeListBtn + " btn "} type="button">
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
                <button className={styles.typeListBtn + " btn "} type="button">
                  熟食/冷藏、冷凍食品
                </button>
                <button className={styles.typeListBtn + " btn "} type="button">
                  米/麵條
                </button>
                <button className={styles.typeListBtn + " btn "} type="button">
                  調理包/料理包
                </button>
                <button className={styles.typeListBtn + " btn "} type="button">
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
                <button className={styles.typeListBtn + " btn  "} type="button">
                  其他
                </button>
              </div>
            </div>
          </div>
          <main className="bg-info w-100">
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
                <button class="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
