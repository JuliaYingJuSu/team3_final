import Head from "next/head";
import Navbar from "@/components/layout/default-layout/navbar-main/index";
import Banner from "@/components/book/banner";
import Carousel from "@/components/layout/default-layout/carousel";
import Footer from "@/components/layout/default-layout/footer";

export default function Index() {
  return (
    <>
      <Head>
        <title>食食嗑嗑-餐廳主頁</title>
      </Head>
      <Navbar></Navbar>
      <img className="w-100" src="../../images/book/r1-1cut.png" alt="..." />
      <div className="d-flex justify-content-center my-5">
        <img
          style={{ width: "167.48px", marginRight: "50px" }}
          src="../../images/book/r1-2cut.png"
          alt="..."
        />
        <img
          style={{ width: "167.48px", marginRight: "50px" }}
          src="../../images/book/r1-3cut.png"
          alt="..."
        />
        <img
          style={{ width: "167.48px" }}
          src="../../images/book/r1-4cut.png"
          alt="..."
        />
      </div>
      <br />
      <div className="container" style={{ Width: "1320px" }}>
        <h3 style={{ fontWeight: "bold" }}>Cin Cin Osteria 請請義大利餐廳</h3>
        <div className="fs18">
          <div className="d-flex">
            <span className="pe-2">
              <span className="icon-map"></span>
            </span>
            <div>台南市中西區尊王路140號</div>
          </div>
          <div className="d-flex">
            <span className="pe-2">
              <span className="icon-Call"></span>
            </span>
            <div>06 221 0699</div>
          </div>
          <div className="d-flex">
            <span className="pe-2">
              <span className="icon-calender"></span>
            </span>
            <div>每週一、週二休息</div>
          </div>
        </div>
        <br />
        <hr className="grey" style={{ width: "1320px" }} />
        <br />
        <div className="fs18">
          <p>
            『堅持原型食材，簡單調味』『我們只提供我們自己也吃的食物』堅持使用台灣島嶼的當季農產與、新鮮現流海鮮漁獲，和進口的調味品，所融合出的義式料理餐廳，帶給每一位貴賓視覺與味覺上的饗宴。
            <br />
            <br />
            <br />
            ***
            為了提供貴客完美用餐體驗與品質、尊重員工及其他用餐客人，以下說明請您詳閱，謝謝您的體諒與配合
            ****
            <br />
            <br />
            １．訂位保留 10 分鐘，如逾時將視場狀況重新安排座位。每一輪用餐限時 2
            小時
            <br />
            ２．低消為每人累積點滿 $150、加收 10% 服務費
            <br />
            ３．本系統接受 60
            天內訂位。若需取消或更改訂位，請提前線上操作或來電告知
            <br />
            ４．提供兒童專用安全餐具及座位，您可於線上訂位時留言告知需求
            <br />
            ５．提供部分蛋奶素餐點，請參考菜單上綠色標示
            <br />
            ６．本餐廳未販售酒精類飲品，若您欲攜帶酒類進場不加收開瓶費
            <br />
            ７．超過８人用餐之訂位，請直接致電我們將為您特別安排
          </p>
        </div>
        <br />
        <hr className="grey" style={{ width: "1320px" }} />
        <br />
        <div className="d-flex">
          <div
            className="fs18 align-self-center"
            style={{ marginRight: "100px" }}
          >
            <h4>營業時間</h4>
            <br />
            <p>
              週二至週五
              <br />
              <br />
              午餐 11:00-15:00 (最後點餐14:00)
              <br />
              晚餐 17:00-21:00 (最後點餐20:00)
              <br />
              <br />
              <br />
              週六至週日
              <br />
              <br />
              午餐 11:00-16:00 (最後點餐15:00)
              <br />
              晚餐 17:00-21:00 (最後點餐20:00)
            </p>
          </div>
          <div>
            <img
              style={{ width: "800px" }}
              src="../../images/book/map.png"
              alt=""
            />
          </div>
        </div>
        <br />
        <hr className="grey" style={{ width: "1320px" }} />
        <br />
        <br />
        <br />
        <h4>美味饗宴</h4>
        <br />
        <br />
        <img src="../../images/book/menu.png" alt="" />
        <br />
        <hr className="grey" style={{ width: "1320px" }} />
        <br />
      </div>

      <Footer></Footer>
    </>
  );
}
