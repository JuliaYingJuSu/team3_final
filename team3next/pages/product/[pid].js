import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/default-layout/navbar-main";
import Bread from "@/components/product/bread";
import Footer from "@/components/layout/default-layout/footer";
import styles from "./list.module.css";
// import indexStyles from "./index.module.css";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CarouselProduct from "@/components/layout/default-layout/carousel-product";
import { useRouter } from "next/router";

export default function productDetail() {
  const [data, setData] = useState({
    product_id: "",
    product_name: "",
    price: "",
    product_description: "",
    specification: "",
    product_type_id: "",
    product_type_list_id: "",
    isValid: "",
    product_img_id: "",
    product_img: [],
    showed_1st: "",
  });

  const router = useRouter();

  const [wish, setWish] = useState(false);
  useEffect(() => {
    if (router.isReady) {
      const pid = router.query.pid; //***
      const uid = "10" || "";
      // const uid = localStorage.getItem()

      console.log(pid);

      fetch(`http://localhost:3002/product/${pid}/${uid}`)
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          setData(r);
          setWish(r.rowsWished);
        });
    }
  }, [router.isReady]);

  // data.rows && console.log(data.rows.specification);
  // console.log(data.rows?.specification.split("\\n"));
  // const specSplit = data.rows?.specification.replace("\\n", "<br />");
  // console.log(specSplit);
  const specSplit = data.rows?.specification.split("\\n").map((v) => {
    return <p>{v}</p>;
  });

  const handleWish = () => {
    if (router.isReady) {
      //   // const pathName = router.pathname; // /product/[pid]
      //   // const pathName = router.query; //{pid:27}
      const pathName = router.query.pid; //{27}
      console.log(pathName);
      // }

      if (!wish) {
        fetch("http://localhost:3002/product/add-wish", {
          method: "POST",
          body: JSON.stringify({
            pid: pathName,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          // .then((r) => console.log(r)) //Response {type: 'cors', url: 'http://localhost:3002/product/add-wish', redirected: false, status: 200, ok: true, …}
          // .then((r) => {
          //   console.log(r); //defined
          // })
          .then((r) => r.json())
          .then((r) => {
            console.log(r); //true
            if (r) {
              // location.reload();
            }
          })
          .catch((ex) => {
            console.log(ex);
          });
      }
      if (wish) {
        console.log("1111110");
        fetch("http://localhost:3002/product/del-wish", {
          method: "POST",
          body: JSON.stringify({
            pid: pathName,
          }),
          headers: {
            "Content-Type": "application/json",
            //#region (有無"Content-Type": "application/json"與req.body的關聯)

            //"Content-Type": "application/json" 表示你將向後端傳送 JSON 格式的資料。當你註解掉這一行，即不設定 Content-Type，瀏覽器預設會使用 "Content-Type": "application/x-www-form-urlencoded"。這會導致資料以表單形式傳送，而不是 JSON 格式。

            // 在後端的程式碼中，你期望接收的是 JSON 格式的資料：(const pid = req.body.pid;)

            //當你的前端程式碼中的 Content-Type 設為 "application/json" 時，Express（或其他後端框架）會使用中間件來解析 JSON 格式的請求主體，將其轉換為 JavaScript 物件，並可以透過 req.body 存取。

            //但是，當你註解掉 "Content-Type": "application/json"，瀏覽器預設會將資料以表單形式傳送。在這種情況下，Express 不會自動解析 JSON 資料，而是將其視為表單資料。因此，你需要使用中間件，例如 body-parser 來解析表單資料。這樣才能夠正確地從 req.body 中取得 pid。

            //如果你想繼續使用 JSON 格式的資料傳送，請確保前端的 Content-Type 設為 "application/json"，並確保後端使用相應的中間件來解析 JSON 資料。如果你想使用表單形式傳送資料，則可以註解掉 "Content-Type" 行，但需要在後端使用表單資料的解析中間件。
            //#endregion
          },
        })
          .then((r) => r.json())
          .then((r) => {
            console.log(r); //true
            if (r) {
              location.reload();
            }
          })
          .catch((ex) => {
            console.log(ex);
          });
      }
    }
  };

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
                style={{ "--swiper-navigation-color": "#3f4c5c" }}
              >
                {data.rowsImgs?.map((v, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <img
                        className="w-100 h-100"
                        src={"/images/product/" + v.product_img}
                        alt=""
                      />
                    </SwiperSlide>
                  );
                })}
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
                  {/* {console.log(data.rows?.product_img)}; */}
                  <span className="me-auto">{data.rows?.product_name}</span>
                  {/* ******************************************************** */}
                  {/* <Link href="/product/add-wish/"> */}
                  <span
                    className={wish ? "icon-mark-fill" : "icon-mark"}
                    onClick={() => {
                      handleWish();

                      setWish(!wish);
                      // console.log(wish);
                    }}
                  ></span>
                  {/* </Link> */}
                </p>
                <p className="ps-3">
                  <span>NT$ </span>
                  {data.rows?.price}
                </p>
              </div>
              <div className="fs-3 my-2">
                <span className="icon-Star"></span>
                <span className="icon-Star"></span>
                <span className="icon-Star"></span>
                <span className="icon-Star"></span>
                <span className="icon-Star"></span>
              </div>

              <div className={styles.btnBox}>
                <form>
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
                </form>
              </div>
            </div>
          </div>
          {/* ------------商品內文------------ */}
          <div className={styles.infoBox + " w-100"}>
            <div className={styles.infoItem}>
              <p className={styles.head + " h4"}>商品介紹</p>
              <p className={styles.text}>
                {data.rows && data.rows.product_description}
              </p>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.head + " h4"}>商品規格</p>
              <p className={styles.text}>{data.rows && specSplit}</p>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.head + " h4"}>商品評論</p>
              {data.rows &&
                data.rowsComment.map((v) => {
                  return (
                    <div className={styles.commentBox}>
                      <div className={styles.pic}>
                        <img
                          className="w-100 h-100 object-fit-cover"
                          src="/images/logo.png"
                          alt=""
                        />
                      </div>
                      <div className={styles.comment}>
                        <p>{v.nickname}</p>
                        <p>{v.content}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className={styles.recommendBox + " row pb-5 "}>
            <p className={styles.head + " h4"}>推薦商品</p>
            <div className={styles.test + " w-75"}>
              {/* ------------推薦商品----------- */}
              <Swiper
                spaceBetween={40}
                slidesPerView={4}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                style={{ "--swiper-navigation-color": "#3f4c5c" }}
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
