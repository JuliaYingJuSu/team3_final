import React from "react";
import Navbar from "@/components/layout/default-layout/navbar-main";
import Bread from "@/components/product/bread";
import Footer from "@/components/layout/default-layout/footer";
import styles from "./list.module.css";
// import indexStyles from "./index.module.css";
import Form from "react-bootstrap/Form";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CarouselProduct from "@/components/layout/default-layout/carousel-product";
// import "swiper/css/pagination";
// import ProductCarousel from "@/components/product/ProductCarousel";
// import Carousel from "react-bootstrap/Carousel";
// import ExampleCarouselImage from "components/ExampleCarouselImage";

export default function productDetail() {
  return (
    <>
      <Navbar />
      <div className="container ">
        <Bread />
        <div
          className={styles.topBox + " container d-flex justify-content-around"}
        >
          <button class="btn" type="button">
            全部商品
          </button>
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
        <main className=" w-100 mt-4 ">
          <div className={styles.productMain + " row"}>
            <div
              className={
                styles.test +
                " col-12 col-sm-12 col-md-6  col-lg-6 col-xl-6 col-xxl-6"
              }
            >
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  {
                    <img
                      className="w-100 h-100"
                      src="/images/product/螢幕擷取畫面 2023-09-26 101959.png"
                      alt=""
                    />
                  }
                </SwiperSlide>
                <SwiperSlide>
                  {
                    <img
                      className="w-100 h-100"
                      src="/images/product/螢幕擷取畫面 2023-09-26 101959.png"
                      alt=""
                    />
                  }
                </SwiperSlide>
                <SwiperSlide>
                  {
                    <img
                      className="w-100 h-100"
                      src="/images/product/螢幕擷取畫面 2023-09-26 101959.png"
                      alt=""
                    />
                  }
                </SwiperSlide>
                <SwiperSlide>
                  {
                    <img
                      className="w-100 h-100"
                      src="/images/product/螢幕擷取畫面 2023-09-26 101959.png"
                      alt=""
                    />
                  }
                </SwiperSlide>
              </Swiper>
            </div>
            <div
              className={
                styles.context +
                " d-flex flex-column col-12 col-sm-12 col-md-6  col-lg-6 col-xl-6 col-xxl-6"
              }
            >
              <div className="my-2 h5 ">
                <p className="d-flex ">
                  <span className="me-auto">
                    【HEY YUM!】丹麥無麩質水果軟糖
                  </span>
                  <span className="icon-mark"></span>
                </p>
                <p className="ps-3">NT$ 1000</p>
              </div>
              <div className="fs-3 my-2">
                <span className="icon-Star"></span>
                <span className="icon-Star"></span>
                <span className="icon-Star"></span>
                <span className="icon-Star"></span>
                <span className="icon-Star"></span>
              </div>
              <p className="mb-auto fs16b">
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
          <div className={styles.infoBox + " w-100"}>
            <div className={styles.infoItem}>
              <p className={styles.head + " h4"}>商品介紹</p>
              <p className={styles.text}>
                使用天然果汁🍋、蜂蜜🍯製作的水果軟糖
                曾被ELLE、BAZAAR、GQ等時尚雜誌推薦，多位藝人也讚不絕口的美味
                聚會時、出遊時、在家追劇時，來上一顆有夠享受😋😋
                <br />
                <br />◆ 丹麥原裝進口 <br />◆
                巴黎潮流指標選品店Colette選用及肯定的可愛療癒系包裝 <br />◆
                無添加人工色素、防腐劑、香料 <br />◆ 不含麩質、不含乳糖
                (優格水果口味除外)，過敏體質不擔心 <br />◆ 莓果蔬食口味為Vegan
              </p>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.head + " h4"}>商品規格</p>
              <p className={styles.text}>
                商品產地 : 丹麥
                <br />
                賞味期限 : 製造日期後 365 天
                <br />
                內容量 : 100g x 6<br />
                素食者可食用
              </p>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.head + " h4"}>商品評論</p>
              <div className={styles.commentBox}>
                <div className={styles.pic}></div>
                <div className={styles.comment}>
                  <p>名字</p>
                  <p>好吃不膩耶耶耶耶耶耶耶耶~</p>
                </div>
              </div>
              <div className={styles.commentBox}>
                <div className={styles.pic}></div>
                <div className={styles.comment}>
                  <p>名字</p>
                  <p>好吃不膩耶耶耶耶耶耶耶耶~</p>
                </div>
              </div>
              <div className={styles.commentBox}>
                <div className={styles.pic}></div>
                <div className={styles.comment}>
                  <p>名字</p>
                  <p>好吃不膩耶耶耶耶耶耶耶耶~</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.recommendBox + " row pb-5 "}>
            <p className={styles.head + " h4"}>推薦商品</p>
            <div className={styles.test + " w-75"}>
              <Swiper
                spaceBetween={40}
                slidesPerView={4}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {Array(5)
                  .fill(1)
                  .map((v, i) => {
                    return (
                      <SwiperSlide key={i}>
                        {
                          <div
                            className="
                  justify-content-center align-items-center "
                          >
                            <div>
                              <img
                                src="/images/product/螢幕擷取畫面 2023-09-26 101926.png"
                                alt=""
                                className="object-fit-cover w-100 h-100"
                              />
                            </div>
                            <div>
                              <span>品牌名 產品名</span>
                            </div>
                            <div>
                              <span>NT$ 1000</span>{" "}
                              <span className="icon-cark"></span>
                            </div>
                          </div>
                        }
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
