import Head from "next/head";
import Navbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";

export default function Index() {
  return (
    <>
      <Head>
        <title>食食嗑嗑-訂位人資料</title>
      </Head>
      <Navbar></Navbar>
      <div className="container mt-4">
        <div className="d-flex justify-content-around align-items-center">
          <div className="container2">
            <img
              className="w-100"
              src="../../images/book/r1-1cut.png"
              alt="..."
            />
            <div className="h5 d-flex justify-content-center py-4 con1">
              <div className="pe-2 align-self-center">
                <span className="icon-map"></span>
              </div>
              <div className="ms-1">
                Cin Cin Osteria
                <br />
                請請義大利餐廳
              </div>
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
                  <div className="ms-4">3 大 1 小</div>
                </div>
                <div className="d-flex mt-2">
                  <span className="pe-2">
                    <span className="icon-calender"></span>
                  </span>
                  <div className="ms-4">2023年11月7日 週二</div>
                </div>
                <div className="d-flex mt-2">
                  <span className="pe-2">
                    <span className="icon-bell"></span>
                  </span>
                  <div className="ms-4">17:00</div>
                </div>
              </div>
            </div>
          </div>
          <div className="container3">
            <div className="mb-4 form-check">
              <input
                className="form-check-input me-3"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label fs16" for="flexCheckDefault">
                訂位人聯絡方式與登入的會員資料相同
              </label>
            </div>
            <div className="mb-2 d-flex">
              <div className="rowmb-2">
                <label htmlFor="name" className="form-label col-form-label">
                  訂位人姓名
                </label>
                <div className="col-12">
                  <input
                    type="text"
                    className="inputframe name form-control"
                    id="name"
                    placeholder=" 請輸入姓名"
                    autoFocus
                  />
                </div>
              </div>
              <div className="ms-4 mt-3 fs18 d-flex align-self-end">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked
                  />
                  <label className="form-check-label" for="flexRadioDefault1">
                    小姐
                  </label>
                </div>
                <div className="form-check ms-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    先生
                  </label>
                </div>
                <div className="form-check ms-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                  />
                  <label className="form-check-label" for="flexRadioDefault3">
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
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="d-flex justify-content-center my-5">
          <button className="btn btn-middle me-3">確認訂位</button>
          <button className="btn btn-middle ms-3">回上一頁</button>
        </div>
        <br />
      </div>
      <Footer></Footer>
      <style jsx>
        {`
          textarea {
            border: 1px #d9d9d9 solid;
            width: 500px;
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
          }
          .container3 {
            border: 1px solid grey;
            border-radius: 40px;
            width: 700px;
            height: 800px;
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
        `}
      </style>
    </>
  );
}
