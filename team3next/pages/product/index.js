import { useContext, useEffect, useState } from "react";
import Navbar from "@/components/layout/default-layout/navbar-main";
import styles from "./index.module.css";
import Bread from "@/components/product/bread";
import Footer from "@/components/layout/default-layout/footer";
import { Button, Form } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import AuthContext from "@/hooks/AuthContext";
import RunContext from "@/hooks/RunContext";
import Pagination from "@/components/product/pagination";
import axios from "axios";
import TestInput from "./test";
import LoadingCard from "@/components/product/loading-card";
import ws from "ws";
import Swal from "sweetalert2";

export default function index() {
  //資料用
  const [data, setData] = useState([]);
  const [wish, setWish] = useState([]);
  const [order, setOrder] = useState("new");
  const [inputText, setInputText] = useState("");
  const [search, setSearch] = useState("");
  console.log(search);

  //打開篩到注音關掉backspace不同步
  // useEffect(() => {
  //   setSearch(inputText);
  // }, [inputText]);

  const [type, setType] = useState("");
  const [typeList, setTypeList] = useState("");
  //篩選用
  const [price, setPrice] = useState("");
  const priceList = [
    [300, 500, 800, 1000, 1001],
    ["300以下", "300 - 500", "500 - 800", "800 - 1000", "1000以上"],
  ];
  const [items, setItems] = useState([]);
  // console.log(items);

  //重渲染頁面用
  const { run, setRun } = useContext(RunContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // console.log(run);

  //分頁用
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = data.rows?.slice(firstItemIndex, lastItemIndex);

  const uid = data.rows ? JSON.parse(localStorage.getItem("auth")).user_id : "";
  // console.log(uid);

  // 取資料
  useEffect(() => {
    fetch("http://localhost:3002/api/product", {
      method: "POST",
      body: JSON.stringify({
        uid: JSON.parse(localStorage.getItem("auth")).user_id,
        // uid: uid,
        order: order,
        search: search,
        type: type,
        typeList: typeList.split(",")[1],
        price: price,
        items: items,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        const a = r.json();
        return a;
      })
      //#region (promise運作)

      //then的第一次:接收到的r >>> fetch的結果(Response {type: 'cors', url: 'http://localhost:3002/product', redirected: false, status: 200, ok: true, …})
      //r.json() >>> response的json()會得到 >>> Promise {<pending>}
      // [[Prototype]]: Promise [[PromiseState]]:"fulfilled" [[PromiseResult]]:Array(34)

      //then的第二次:會自動把結果[[PromiseResult]]:Array(34)傳下去

      //#endregion

      .then((data) => {
        setData(data);
        //取願望資料
        if (data.rowsWish.length > 0) {
          let wishList = data.rowsWish.map((v) => v.product_id);
          // console.log(wishList);
          setWish(wishList);
        }
      });
  }, [order, search, typeList, price, items, run]);

  // 增刪願望清單
  const handleWish = (product_id) => {
    if (!wish.includes(product_id)) {
      // console.log(product_id);
      fetch("http://localhost:3002/api/product/add-wish", {
        method: "POST",
        body: JSON.stringify({
          pid: product_id,
          uid: JSON.parse(localStorage.getItem("auth")).user_id,
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
            setRun(!run);
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
          uid: JSON.parse(localStorage.getItem("auth")).user_id,
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
            // location.reload();
            setRun(!run);
          }
        })
        .catch((ex) => {
          console.log(ex);
        });
    }
  };

  //ws-------------------------------------------
  const [msg, setMsg] = useState("");
  console.log(msg);
  const [msgs, setMsgs] = useState([]);
  console.log(msgs);

  let ws;
  useEffect(() => {
    ws = new WebSocket("ws://localhost:3002/ws");
    ws.onopen = () => {
      console.log("open connection");
    };
    //#region (onmessage)
    //  這個程式碼片段是一個 WebSocket 的事件監聽器，當從後端接收到訊息時，會觸發 onmessage 事件。在這段程式碼中：

    //  res 是從後端接收到的訊息物件。
    //  JSON.parse(res.data) 解析接收到的訊息，將其轉換成 JavaScript 物件。
    //  接著程式碼檢查訊息的 type 屬性是否為 "message"。如果是，代表這是一則正常的訊息。
    //  然後，它將這條訊息的 data 屬性（假設 msg.data 包含了訊息的內容）加入到原本的 msgs 狀態陣列中，並更新狀態。這樣做的效果是將新的訊息加到舊有的訊息列表中，保留了之前的訊息。
    //#endregion
    ws.onmessage = (res) => {
      console.log("res");
      const msg = JSON.parse(res.data);
      if (msg.type === "message") {
        setMsgs([...msgs, msg.data]);
      }
    };
    ws.onclose = () => {
      console.log("close connection");
    };
  }, []);

  function sendMsg() {
    console.log("進sendMsg");

    // -------------------

    // 錯誤訊息 "Uncaught TypeError: Cannot read properties of undefined (reading 'send')" 意味著在你的前端程式碼中，WebSocket 的連接 ws 是 undefined。這可能是因為在 sendMsg 函數被呼叫時，ws 變數尚未被正確初始化。

    // 在你的程式碼中，ws 變數是在 useEffect 內部聲明的，並且只在 useEffect 的作用域內有效。這意味著在 sendMsg 函數中無法正確訪問到 ws。

    // 為了解決這個問題，你可以將 ws 變數保存在 useRef 中，這樣它的作用域就不會受限於 useEffect 了。
    // ---------------------

    if (ws.readyState === 1) {
      console.log("ws.readyState === 1");
      ws.send(JSON.stringify({ type: "message", constent: msg }));
    } else {
      console.log("ws.readyState不等於 1");
    }

    // if (!ws) return;
    // ws.send(JSON.stringify({ constent: msg }));
  }
  //------------------------------------------------
  return (
    <>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasBottom"
        aria-controls="offcanvasBottom"
        style={{ position: "absolute", right: "0px", bottom: "300px" }}
      >
        找小編
      </button>

      <div
        class="offcanvas offcanvas-bottom"
        tabIndex="-1"
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel"
      >
        <div class="offcanvas-header">
          {msgs.map((msg) => {
            return (
              <h5 class="offcanvas-title" id="offcanvasBottomLabel">
                {msg}
              </h5>
            );
          })}

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body small ">
          ...
          <div></div>
          <input
            type="text"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <button
            className="btn btn-warning"
            onClick={() => {
              console.log("進sendMsg");

              sendMsg();
            }}
          >
            送出
          </button>
        </div>
      </div>

      <Navbar />
      <div className="container" style={{ paddingTop: "225px" }}>
        <Bread typeList={typeList} />
        <div className="w-100 d-flex mb-3">
          <main className="w-100 d-flex">
            <div className={styles.leftBox}>
              {/* -----------分類選單---------- */}
              <div className={styles.left}>
                <a href="/product">
                  <button className={styles.leftA + " btn"} type="button">
                    全部商品
                  </button>
                  {/* <span className="icon-square"></span> */}
                </a>

                {data.rowsType &&
                  data.rowsType.map((v, i) => {
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
                                    // console.log(list.product_type_list_name);
                                    setTypeList(
                                      `${list.product_type_list_id},${list.product_type_list_name}`
                                    );
                                    //在有篩選條件的狀態下按到非擁有此條件的小分類時，把非擁有的條件清掉
                                    const newItems = items.filter((v) => {
                                      const [fullItem] = data.items.filter(
                                        (a) => a.item_id == v
                                      );
                                      console.log(fullItem);

                                      return fullItem.product_type_list_id
                                        .split(",")
                                        .includes(list.product_type_list_id);
                                    });
                                    setItems(newItems);
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
              {/* ------------篩選條件----------- */}
              <div className={styles.left}>
                <p className="h6 px-2 pb-3">
                  篩選條件
                  <span
                    style={{
                      background: "#ebd8a9",
                      borderRadius: "40px",
                      padding: "5px",
                      fontSize: "12px",
                      color: "#3f4c5c",
                      marginLeft: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setItems([]);
                    }}
                  >
                    清除
                  </span>
                </p>
                <form className="d-flex flex-column px-2">
                  {typeList
                    ? data.items
                        ?.filter((v) => {
                          console.log("data.items");
                          console.log(data.items);
                          return v.product_type_list_id
                            .split(",")
                            .includes(typeList.split(",")[0]);
                        })
                        .map((v, i) => {
                          console.log("items");
                          console.log(items);
                          console.log(items.includes(v.item_id));

                          return (
                            <label key={i}>
                              <input
                                checked={
                                  items.includes(v.item_id) ? true : false
                                }
                                className="mb-4"
                                type="checkbox"
                                value={v.item_id}
                                onChange={() => {
                                  if (!items.includes(v.item_id)) {
                                    const newItems = [...items, v.item_id];
                                    console.log(newItems);

                                    setItems(newItems);
                                  } else {
                                    const newItems = items.filter(
                                      (a) => a != v.item_id
                                    );
                                    setItems(newItems);
                                  }
                                  // setItems(items.push(v));
                                  //**在setItems之前push就已試圖直接變items
                                }}
                              />
                              {v.item_name}
                            </label>
                            // <TestInput
                            //   key={v.item_id}
                            //   item_id={v.item_id}
                            //   items={items}
                            //   setItems={setItems}
                            // />

                            // <div key={v.item_id}>?????</div>
                          );
                        })
                    : data.items &&
                      data.items
                        // .filter((v) => v.price_range == 1)
                        .map((v, i) => {
                          return (
                            <label key={i}>
                              <input
                                checked={
                                  items.includes(v.item_id) ? true : false
                                }
                                className="mb-4"
                                type="checkbox"
                                value={v.item_id}
                                onChange={() => {
                                  if (!items.includes(v.item_id)) {
                                    const newItems = [...items, v.item_id];
                                    setItems(newItems);
                                  } else {
                                    const newItems = items.filter(
                                      (a) => a != v.item_id
                                    );
                                    setItems(newItems);
                                  }
                                  // setItems(items.push(v));
                                  //**在setItems之前push就已試圖直接變items
                                }}
                              />
                              {v.item_name}
                            </label>
                          );
                        })}
                </form>
              </div>
              {/* ------------價格範圍----------- */}
              <div className={styles.left}>
                <p className="h6 px-2 pb-3">
                  價格範圍
                  <span
                    style={{
                      background: "#ebd8a9",
                      borderRadius: "40px",
                      padding: "5px",
                      fontSize: "12px",
                      color: "#3f4c5c",
                      marginLeft: "5px",
                      cursor: "pointer",
                    }}
                  >
                    清除
                  </span>
                </p>

                {priceList[1].map((v, i) => {
                  // console.log(v);
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
            </div>

            <div className="container">
              <div
                className={
                  styles.sort +
                  " row d-flex justify-content-end align-items-center"
                }
              >
                {/* ------------------dropdown------------------- */}

                {/* <div className="dropdown col-auto me-auto ">
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
                </div> */}

                {/* ------------------dropdown------------------- */}
                <span
                  className="me-auto"
                  style={{
                    color: "#666666",
                    fontSize: "18px",
                    fontWeight: "bold",
                    width: "auto",
                  }}
                >
                  共{data.rows?.length}項商品
                </span>
                <form class="col-auto d-flex " role="search">
                  <input
                    class="form-control me-1"
                    type="text"
                    placeholder="搜尋"
                    aria-label="Search"
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                    }}
                    onCompositionEnd={(e) => {
                      setSearch(inputText);
                    }}
                    onKeyDown={(e) => {
                      if (e.key == "Backspace") {
                        setSearch(e.target.value);
                        // setInputText(e.target.value); //同步但篩到注音
                      }
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
              </div>

              <div className="row mb-3 d-flex justify-content-start align-items-center ">
                {/* 卡片 */}
                {isLoading ? (
                  <LoadingCard cards={8} />
                ) : (
                  currentItems?.map(
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
                              <Link href={`/product/${product_id}`}>
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
                                    ? " icon-mark-fill" + " pt-1"
                                    : " icon-mark" + " pt-1"
                                }
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  Swal.fire({
                                    toast: true,
                                    // className: "yyy",
                                    // backdrop: "false",
                                    showConfirmButton: false,
                                    timer: 1500,
                                    position: "top",
                                    width: "250px",
                                    // height: "20px",
                                    text: "已更新願望清單",
                                    icon: "success",
                                    // padding: "0px",

                                    // showCancelButton: true,
                                    // cancelButtonText:
                                    //   '<i class="fa-regular fa-circle-xmark fs-5"></i> 先不要',
                                    // confirmButtonText:
                                    //   '<i class="far fa-check-circle fs-5"></i> 放棄',
                                  });
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
                  )
                )}
                {/* {currentItems?.map(
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
                            <Link href={`/product/${product_id}`}>
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
                                  ? " icon-mark-fill" + " pt-1"
                                  : " icon-mark" + " pt-1"
                              }
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                Swal.fire({
                                  toast: true,
                                  // className: "yyy",
                                  // backdrop: "false",
                                  showConfirmButton: false,
                                  timer: 1500,
                                  position: "top",
                                  width: "250px",
                                  // height: "20px",
                                  text: "已更新願望清單",
                                  icon: "success",
                                  // padding: "0px",

                                  // showCancelButton: true,
                                  // cancelButtonText:
                                  //   '<i class="fa-regular fa-circle-xmark fs-5"></i> 先不要',
                                  // confirmButtonText:
                                  //   '<i class="far fa-check-circle fs-5"></i> 放棄',
                                });
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
                )} */}
              </div>
              <div className="d-flex justify-content-center">
                <Pagination
                  totalItems={data.rows?.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  dataRows={data.rows}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
      <style jsx>
        {`
          .yyy {
            fontsize: 10px !important;
            background: red;
          }
        `}
      </style>
    </>
  );
}
