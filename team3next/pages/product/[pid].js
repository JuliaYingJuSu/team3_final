import React from "react";
import Navbar from "@/components/layout/default-layout/navbar-main";
import Bread from "@/components/product/bread";
import styles from "./list.module.css";
import Form from "react-bootstrap/Form";

export default function productDetail() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Bread />
        <div
          className={styles.topBox + " container d-flex justify-content-around"}
        >
          <div class="dropdown">
            <button
              class="btn dropdown-toggle "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              飲品/沖泡類
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#">
                  茶葉/水果茶
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  咖啡
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  果汁/蔬果汁
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  醋/水果醋
                </a>
              </li>
            </ul>
          </div>
          <div class="dropdown">
            <button
              class="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              烘焙食品/甜點
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#">
                  蛋糕/派
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  手工餅乾
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  麵包/吐司
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  奶酪/布丁/果凍
                </a>
              </li>
            </ul>
          </div>
          <div class="dropdown">
            <button
              class="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              休閒零食
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#">
                  零食
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  糖果/巧克力
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  果醬/抹醬
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  水果乾
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  堅果/穀物
                </a>
              </li>
            </ul>
          </div>
          <div class="dropdown">
            <button
              class="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              烹料料理
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#">
                  熟食/冷藏、冷凍食品
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  米/麵條
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  調理包/料理包
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  調味料/醬料
                </a>
              </li>
            </ul>
          </div>
          <div class="dropdown">
            <button
              class="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              其他
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#">
                  其他
                </a>
              </li>
            </ul>
          </div>
        </div>
        <main className="bg-info">
          <div className="productMain">
            <div className="context">
              <div>
                <p>
                  <span>【HEY YUM!】丹麥無麩質水果軟糖</span>
                  <span className="icon-mark"></span>
                </p>
                <p>NT$ 1000</p>
              </div>
              <p>
                ◆ 丹麥原裝進口 ◆ 不含人工香料、色素、甜味劑、防腐劑 <br />◆
                莓果蔬食口味 (藍色包裝) 為素食者可食用
                <br /> ◆ 不含麩質、不含乳糖
                (優格水果口味除外)，過敏體質也不用擔心
              </p>
              <div className={styles.btnBox}>
                <Form.Select
                  className={" brounded"}
                  size="sm"
                  aria-label="Default select example"
                >
                  <option>請選擇數量</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Select>
                <button className="btn btn-big d-flex justify-content-center align-items-center w-100">
                  加入購物車
                </button>
                <button className="btn btn-big d-flex justify-content-center align-items-center w-100">
                  立即購買
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
