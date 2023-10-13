import { useEffect, useState } from "react";
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
  const [wish, setWish] = useState([]);
  const [order, setOrder] = useState("new");

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [typeList, setTypeList] = useState("");

  const [price, setPrice] = useState("");
  console.log(price);
  const priceList = [
    [300, 500, 800, 1000, 1001],
    ["300以下", "300 - 500", "500 - 800", "800 - 1000", "1000以上"],
  ];

  useEffect(() => {
    // axios.get("");

    fetch("http://localhost:3002/api/product", {
      method: "POST",
      body: JSON.stringify({
        // uid: localStorage.getItem()||0,
        uid: 10,
        order: order,
        search: search,
        type: type,
        typeList: typeList,
        price: price,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        const a = r.json();
        return a;
      })
      //then的第一次:接收到的r >>> fetch的結果(Response {type: 'cors', url: 'http://localhost:3002/product', redirected: false, status: 200, ok: true, …})
      //r.json() >>> response的json()會得到 >>> Promise {<pending>}
      // [[Prototype]]: Promise [[PromiseState]]:"fulfilled" [[PromiseResult]]:Array(34)

      //then的第二次:會自動把結果[[PromiseResult]]:Array(34)傳下去
      .then((data) => {
        setData(data);

        if (data.rowsWish.length > 0) {
          let wishList = data.rowsWish.map((v) => v.product_id);
          // console.log(wishList);
          setWish(wishList);
        }
      });
  }, [order, search, typeList, price]);

  // 增刪購物清單
  const handleWish = (product_id) => {
    if (!wish.includes(product_id)) {
      console.log(product_id);
      fetch("http://localhost:3002/api/product/add-wish", {
        method: "POST",
        body: JSON.stringify({
          pid: product_id,
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
            location.reload();
          }
        })
        .catch((ex) => {
          console.log(ex);
        });
    }
    if (wish.includes(product_id)) {
      fetch("http://localhost:3002/api/product/del-wish", {
        method: "POST",
        body: JSON.stringify({
          pid: product_id,
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
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Bread />
        <div className="w-100 d-flex mb-3">
          <main className="w-100 d-flex">
            <div className={styles.leftBox}>
              <div className={styles.left}>
                <a href="/product">
                  <button className={styles.leftA + " btn"} type="button">
                    全部商品
                  </button>
                </a>

                {/* -----------分類選單---------- */}
                {data.rowsType &&
                  data.rowsType.map((v, i) => {
                    // console.log(v);
                    return (
                      <>
                        <button
                          className="btn"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={"#type" + v.product_type_id}
                          aria-expanded="false"
                          aria-controls={"#type" + v.product_type_id}
                        >
                          {v.product_type_name}
                          <span className="fs-6 ms-2 icon-arrow-down"></span>
                        </button>
                        <div
                          className="collapse"
                          id={"type" + v.product_type_id}
                        >
                          {data.rowsTypeList
                            .filter(
                              (list) =>
                                list.product_type_id === v.product_type_id
                            )
                            .map((list) => {
                              return (
                                <button
                                  className={styles.typeListBtn + " btn"}
                                  type="button"
                                  onClick={() => {
                                    setTypeList(list.product_type_list_name);
                                  }}
                                >
                                  {list.product_type_list_name}
                                </button>
                              );
                            })}
                        </div>
                      </>
                    );
                  })}
              </div>
              <div className={styles.left}>
                <p className="h6 px-2 pb-3">價格範圍</p>

                {priceList[1].map((v, i) => {
                  console.log(v);
                  return (
                    // 畫面渲染後不會再變動key才能用索引
                    <label key={i} className="w-100 ps-2 my-2">
                      <input
                        className="me-2"
                        // className="----------------------------"
                        type="radio"
                        // 用目前選中的food狀態來比較，決定是否呈現選中的樣子
                        checked={price === v}
                        // 一樣可以使用value屬性，用e.target.value在事件觸發後得到值
                        value={v}
                        onChange={(e) => {
                          //  狀態中記錄的是每個選項被選中的值
                          setPrice(e.target.value);
                        }}
                      />
                      {v}
                    </label>
                  );
                })}
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

            <div className="container">
              <div
                className={
                  styles.sort +
                  " row d-flex justify-content-end align-items-center"
                }
              >
                {/* ---------------------------------------- */}
                <div className="dropdown col-auto me-auto ">
                  <button
                    className={
                      styles.barBtn + " p-1 btn-small border-0 dropdown-toggle"
                    }
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-target="#rwd"
                  >
                    分類
                  </button>
                  <div className="dropdown-menu" id="rwd">
                    <div className={styles.leftBox}>
                      <div className={styles.left}>
                        <Link href="#/product">
                          <button
                            className={styles.leftA + " btn"}
                            type="button"
                          >
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
                          飲品/沖泡類{" "}
                          <span className="fs-6 ms-2 icon-arrow-down"></span>
                        </button>
                        <div className="collapse" id="type1">
                          <button
                            className={styles.typeListBtn + " btn"}
                            type="button"
                          >
                            茶類
                          </button>
                          <button
                            className={styles.typeListBtn + " btn"}
                            type="button"
                          >
                            咖啡/咖啡豆
                          </button>
                          <button
                            className={styles.typeListBtn + " btn"}
                            type="button"
                          >
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
                          烘焙食品/甜點{" "}
                          <span className="fs-6 ms-2 icon-arrow-down"></span>
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
                          休閒零食{" "}
                          <span className="fs-6 ms-2 icon-arrow-down"></span>
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
                          烹料料理{" "}
                          <span className="fs-6 ms-2 icon-arrow-down"></span>
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
                          其他{" "}
                          <span className="fs-6 ms-2 icon-arrow-down"></span>
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
                                checked={true}
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
                  </div>
                </div>

                <select
                  value={order}
                  onChange={(e) => {
                    setOrder(e.target.value);
                  }}
                  class=" col-2 form-select form-select-sm"
                  aria-label="Small select example"
                >
                  <option value="new">最新商品</option>
                  <option value="pHigh">價格高到低</option>
                  <option value="pLow">價格低到高</option>
                </select>
                <form class="col-auto d-flex " role="search">
                  <input
                    class="form-control me-1"
                    type="text"
                    placeholder="搜尋"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  {/* <button
                    class="btn icon-search"
                    onClick={(e) => {
                      setSearch(inputText);
                    }}
                  ></button> */}
                  {/* type="submit" */}
                </form>
              </div>

              <div className="row mb-3 d-flex justify-content-start align-items-center">
                {data.rows?.map(
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
                      product_img_id,
                      product_img,
                      showed_1st,
                    },
                    i
                  ) => {
                    return (
                      <div
                        key={product_id}
                        className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-3 d-flex justify-content-center align-items-center "
                      >
                        <div className={styles.cardP}>
                          <div className={styles.imgBox}>
                            <Link href={"/product/" + product_id}>
                              <img
                                src={"images/product/" + product_img}
                                alt=""
                                className="w-100 h-100 object-fit-cover "
                              />
                            </Link>
                          </div>
                          <div
                            className={
                              styles.contentBox +
                              " px-2 w-100 d-flex justify-content-between pt-2 pb-1 align-items-start"
                            }
                          >
                            <Link
                              href={"/product/" + product_id}
                              className={styles.mylink + " fs16b"}
                            >
                              <span>{product_name}</span>
                            </Link>

                            <span
                              className={
                                wish.includes(product_id)
                                  ? "icon-mark-fill"
                                  : "icon-mark" + " pt-1"
                              }
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleWish(product_id);
                              }}
                            ></span>
                          </div>
                          <div
                            style={{ color: "#666666" }}
                            className={
                              styles.contentBox +
                              " px-2 w-100 d-flex justify-content-between pt-1 pb-1"
                            }
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
