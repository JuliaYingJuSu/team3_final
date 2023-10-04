import React from "react";
import Link from "next/link";
import styles from "@/pages/product/list.module.css";
import { Form } from "react-bootstrap";

export default function Test() {
  return (
    <>
      <div class="dropdown">
        <a
          class="btn btn-secondary dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown link
        </a>

        <ul class="dropdown-menu">
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
                aria-controls="type1"
              >
                飲品/沖泡類 <span className="fs-6 ms-2 icon-arrow-down"></span>
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
                烘焙食品/甜點{" "}
                <span className="fs-6 ms-2 icon-arrow-down"></span>
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
                休閒零食 <span className="fs-6 ms-2 icon-arrow-down"></span>
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
                烹料料理 <span className="fs-6 ms-2 icon-arrow-down"></span>
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
                其他 <span className="fs-6 ms-2 icon-arrow-down"></span>
              </button>
              <div className="collapse" id="type5">
                <button className={styles.typeListBtn + " btn  "} type="button">
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
                  無添加
                </label>
                <label>
                  <input
                    className="mb-4"
                    type="checkbox"
                    name="priceType2"
                    id="priceType2"
                  />
                  無麩質
                </label>
                <label>
                  <input
                    className="mb-4"
                    type="checkbox"
                    name="priceType3"
                    id="priceType3"
                  />
                  蛋奶素
                </label>
                <label>
                  <input
                    className="mb-4"
                    type="checkbox"
                    name="priceType3"
                    id="priceType3"
                  />
                  送禮
                </label>
              </form>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
}
