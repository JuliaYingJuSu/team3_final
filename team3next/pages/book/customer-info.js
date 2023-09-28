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
      <div className="container">
        <div className="container2 ms-auto">
          <div className="d-flex">
            <div className="rowmb-2">
              <label htmlFor="name" className="form-label col-form-label">
                訂位人姓名
              </label>
              <div className="col-12">
                <input
                  type="text"
                  className="inputframe name"
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
                className="inputframe"
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
                className="inputframe"
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
              <textarea name="note" id="note" cols="30" rows="10"></textarea>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <style jsx>
        {`
          textarea {
            border: 1px #d9d9d9 solid;
            width: 500px;
          }
          .container2 {
            border: 1px solid;
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
