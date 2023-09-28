import React from 'react'
import styles from "./order-complete.module.css"
import MyNavbar from '@/components/layout/default-layout/navbar-main/index'
import Footer from '@/components/layout/default-layout/footer'
import productDetail from '@/pages/product/[pid]'


export default function OrderComplete() {
  return (
    <>
    <MyNavbar/>
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
        
        <div className="container text-center">
            {/* check文字 */}
            <div className="icon-check my-4">
            </div>
            <div className="my-5 h5">
            謝謝您！您的訂單已經成立！
            </div>
        </div>

        {/* 底下訂單資訊 */}
        <div className="container w-50 d-flex border p-5 mb-5 justify-content-between">
            <div className="row justify-content-center w-50">
                <div className="col-sm-6 py-1">訂單號碼</div>
                <div className="col-sm-6 py-1">2023071411125</div>
                <div className="col-sm-6 py-1">訂單日期</div>
                <div className="col-sm-6 py-1">2023/09/27</div>
                <div className="col-sm-6 py-1">配送方式</div>
                <div className="col-sm-6 py-1">宅配</div>
                <div className="col-sm-6 py-1">付款方式</div>
                <div className="col-sm-6 py-1">LINE PAY</div>
                <div className="col-sm-6 py-1">收件資訊</div>
                <div className="col-sm-6 py-1">台北市松山區興安街222號</div>
                {/* 強迫col換行 */}
                {/* <div class="w-100"></div> */}
            </div>
        
                <div className="row justify-content-center d-flex w-25">
                    <div className="col-12 col-sm-12 py-1"><button className="btn btn-middle w-100">訂單詳情</button></div>
                    <div className="col-12 col-sm-12 py-1 justify-content-center d-flex"><p>訂單金額 </p><p>NT$320</p></div>
                    {/* <div className="col-6 col-sm-6 py-1"></div> */}
                </div>
        </div> 
    <Footer/>
    </>
  )
}
