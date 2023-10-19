import Head from "next/head";
import Navbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";
import Link from "next/link";
import BreadcrumbCustomerInfo from "@/components/book/breadcrumb-customerInfo";
import { useRouter } from "next/router";
import AuthContext from "@/hooks/AuthContext";
import { useEffect, useState, useContext, Component } from "react";
import Swal from "sweetalert2";

export default function Index() {
  //useState
  const [isChecked, setIsChecked] = useState(false);
  const [bookNote, setBookNote] = useState("");
  const [bookGender, setBookGender] = useState(2);

  const router = useRouter();
  const {
    restaurant_id,
    restaurant_name,
    restaurant_img,
    bookMonth,
    bookDate,
    numAdult,
    numKid,
    selectedTime,
  } = router.query;
  console.log(router.query);
  const { auth } = useContext(AuthContext);
  // console.log(auth);

  // 將日期轉換為Date物件
  const date = new Date(`2023-${bookMonth}-${bookDate}`);

  // 取得星期幾
  const dayOfWeek = date.toLocaleDateString("zh-TW", { weekday: "long" });

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const handleGenderChange = (event) => {
    setBookGender(parseInt(event.target.value));
  };

  // 確認訂位
  const sendForm = async () => {
    // queryURL
    const queryParams = {
      restaurant_id: restaurant_id,
      restaurant_name: restaurant_name,
      bookMonth: bookMonth,
      bookDate: bookDate,
      bookNum: parseInt(numKid) + parseInt(numAdult),
      selectedTime: selectedTime,
    };

    const queryString = new URLSearchParams(queryParams).toString();
    // 準備要發送的訂位資料
    const bookData = {
      user_id: auth.user_id,
      restaurant_id: restaurant_id,
      book_date: "2023-" + bookMonth + "-" + bookDate,
      book_time: selectedTime,
      book_num_adult: numAdult,
      book_num_kid: numKid,
      book_name: auth.user_name,
      book_gender: bookGender,
      book_phone: auth.user_phone,
      book_email: auth.user_email,
      book_note: bookNote,
    };
    console.log(bookData);

    try {
      const response = await fetch("http://localhost:3002/api/book/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        // 處理成功的情況，例如轉向訂位成功頁面
        Swal.fire({
          icon: "success",
          title: "訂位已送出",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          router.push(`/book/book-complete?${queryString}`);
        }, 2000);
      } else {
        // 處理錯誤的情況，例如顯示錯誤訊息
        console.error("訂位失敗");
      }
    } catch (error) {
      console.error("發生錯誤：", error);
    }
  };

  return (
    <>
      <Head>
        <title>食食嗑嗑-訂位人資料</title>
      </Head>
      <Navbar></Navbar>
      <div style={{ marginTop: "225px" }}></div>
      <div className="container d-flex justify-content-center">
        <div style={{ width: "90%" }}>
          <BreadcrumbCustomerInfo
            key={restaurant_id}
            restaurant_name={restaurant_name}
          />
        </div>
      </div>
      <div className="container mt-4">
        <div className="row justify-content-center gy-5">
          <div className="col-12 col-xl-4 d-flex justify-content-center align-items-center">
            <div className="container2">
              <img
                className="w-100"
                src={`http://localhost:3002/img/${restaurant_img}`}
                alt="..."
              />
              <div className="h5 d-flex justify-content-center py-4 con1">
                <div className="pe-2 align-self-center">
                  <span className="icon-map"></span>
                </div>
                <div className="ms-1">{restaurant_name}</div>
              </div>
              <div className="d-flex justify-content-center align-items-center ">
                <div className="fs18 my-3">
                  <div className="d-flex">
                    <span className="pe-2">
                      <span
                        className="icon-member"
                        style={{ fontSize: "16px" }}
                      ></span>
                    </span>
                    <div className="ms-4">
                      {numAdult} 大 {numKid} 小
                    </div>
                  </div>
                  <div className="d-flex mt-2">
                    <span className="pe-2">
                      <span className="icon-calender"></span>
                    </span>
                    <div className="ms-4">
                      2023年{bookMonth}月{bookDate}日 {dayOfWeek}
                    </div>
                  </div>
                  <div className="d-flex mt-2">
                    <span className="pe-2">
                      <span className="icon-bell"></span>
                    </span>
                    <div className="ms-4">{selectedTime}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 表單 */}
          <div className="col col-xl-8 container3 mx-3">
            <div className="mb-4 form-check">
              <input
                className="form-check-input me-3"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                checked={isChecked}
                onChange={handleChange}
              />
              <label
                className="form-check-label fs16"
                htmlFor="flexCheckDefault"
              >
                訂位人聯絡方式與登入的會員資料相同
              </label>
            </div>
            <div className="mb-2 row">
              <div className="col row mb-2">
                <label htmlFor="name" className="form-label col-form-label">
                  訂位人姓名
                </label>
                <div className="col-12">
                  <input
                    type="text"
                    className="inputframe name form-control"
                    id="name"
                    placeholder=" 請輸入姓名"
                    value={isChecked ? auth.user_name : ""}
                    autoFocus
                  />
                </div>
              </div>
              <div className="col my-3 fs18 d-flex align-self-end">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value="0"
                    onChange={handleGenderChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    小姐
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="1"
                    onChange={handleGenderChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    先生
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                    value="2"
                    onChange={handleGenderChange}
                    checked={bookGender === 2}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault3"
                  >
                    其他
                  </label>
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label htmlFor="cellphone" className="form-label col-form-label">
                訂位人手機號碼
              </label>
              <div className="col-12">
                <input
                  type="text"
                  className="inputframe form-control"
                  id="cellphone"
                  value={isChecked ? auth.user_phone : ""}
                  placeholder=" 請輸入手機號碼"
                />
              </div>
            </div>
            <div className="row mb-2">
              <label htmlFor="email" className="form-label col-form-label">
                訂位人 email
              </label>
              <div className="col-12">
                <input
                  type="text"
                  className="inputframe form-control"
                  id="email"
                  value={isChecked ? auth.user_email : ""}
                  placeholder=" 請輸入 email"
                />
              </div>
            </div>
            <div className="row mb-2">
              <label htmlFor="note" className="form-label col-form-label">
                <p>備註 (例如: 少油少鹽)</p>
              </label>
              <div className="col-12">
                <textarea
                  className="form-control"
                  name="note"
                  id="note"
                  cols="30"
                  rows="10"
                  value={bookNote}
                  onChange={(e) => setBookNote(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="d-flex justify-content-center my-5">
          <div onClick={sendForm} className="btn btn-middle me-3">
            確認訂位
          </div>
          <Link href={`/book/${restaurant_id}`} className="btn btn-middle ms-3">
            回上一頁
          </Link>
        </div>
        <br />
      </div>
      <Footer></Footer>
      <style jsx>
        {`
          textarea {
            border: 1px #d9d9d9 solid;
            width: 100%;
          }
          .container2 {
            width: 350px;
            border: 1px solid grey;
          }
          .icon-map:before {
            content: "\e905";
            color: black;
          }
          .h5 {
            line-height: 1.6rem;
          }
          .con1 {
            border-bottom: 1px solid grey;
            padding-left: 50px;
            padding-right: 50px;
          }
          .container3 {
            border: 1px solid grey;
            border-radius: 40px;
            max-width: 700px;
            padding: 100px;
          }
          .inputframe {
            width: 100%;
            height: 42px;
            border-radius: 6px;
            border: 1px #d9d9d9 solid;
          }
          .name {
            width: 200px;
          }
          .form-check-input:checked {
            background-color: #869aaa;
            border-color: #869aaa;
          }
          .form-check-input {
            border-color: #d9d9d9;
          }
        `}
      </style>
    </>
  );
}
