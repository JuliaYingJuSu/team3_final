import React from 'react'
import styles from "./del-detail.module.css"
import MyNavbar from '@/components/layout/default-layout/navbar-main/index'
import Footer from '@/components/layout/default-layout/footer'
import productDetail from '../product/[pid]'
import style from '@/pages/product/list.module.css'


export default function DelDetail() {
  return (
   <>
        <MyNavbar/>
{/* 商城分類bar */}
        <div
          className={style.topBox + " container d-flex justify-content-around"}
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

{/* 購物進度條 */}
        <div className={styles.sectionBar + " mt-5"}>
            {/* <div className="w-75 d-flex justify-content-between"> */}
                <a href="" className={styles.step}>
                    <p className="text-start ">顧客</p>
                </a>

                <a href="" className={styles.step}>
                    <p className="text-start">配送</p>
                </a>
 
                <a href="" className={styles.step}>
                    <p className="text-start">付款</p>
                </a>

                <a href="" className={styles.lastStep}>
                    <p className="text-start">檢視</p>
                </a>

            {/* </div> */}

        </div>

       
{/* 訂購人資訊 */}
            <div className={styles.buyerinfo + " container mt-5 w-50"}>
                <div className={styles.buyertitle + " pb-1"}>訂購人資訊</div>
                <div className="row mt-3 mb-2">
                    <label htmlFor="buyer" className="form-label col-2 col-form-label">姓名</label>
                    <div className="col-12">
                        <input type="text" className={styles.inputframe} id="buyer" placeholder=" 請輸入姓名" autoFocus />
                    </div>
                </div>

                {/* 手機號碼 */}
                <div className="row mb-2">
                    <label htmlFor="telnumber" className="form-label col-2 col-form-label">手機號碼</label>
                    <div className="col-12">
                        <input type="text" className={styles.inputframe} id="telnumber" placeholder=" 請輸入手機號碼" />
                    </div>
                </div>

                {/* 電子信箱 */}
                <div className="row mb-2">
                    <label htmlFor="email" className="form-label col-2 col-form-label">電子信箱</label>
                    <div className="col-12">
                        <input type="text" className={styles.inputframe} id="email" placeholder=" 請輸入e-mail" />
                    </div>
                </div>

                {/* 地址 */}
                <div className="row mb-2">
                    <label htmlFor="placeaddress" className="form-label col-12 col-form-label">地址</label>
                    <div className={styles.sortaddress}>
                        <select className={styles.selectbox}>
                            <option value="taipei">台北市</option>
                            <option value="taichung">台中市</option>
                        </select>
                    </div>
                    <div className={styles.sortaddress + " me-3"}>
                    <select className={styles.selectbox}>
                            <option value="district1">西屯區</option>
                            <option value="district2">北區</option>
                        </select>
                    </div>

                    <div className={styles.sortaddress2}>
                        <input type="text" className={styles.addressdetail} id="placeaddress" placeholder=" 請輸入地址" />
                    </div>

                        
                    
                </div>

                {/* part2 */}

                    <div className={styles.buyertitle + " mt-3 pb-1"}>收件人資訊</div>
                    <div className="row mt-3 mb-2">
                        <label htmlFor="buyer" className="form-label col-2 col-form-label">姓名</label>
                        <div className="col-12">
                            <input type="text" className={styles.inputframe} id="buyer" placeholder=" 請輸入姓名" autoFocus />
                        </div>
                    </div>

                {/* 手機號碼 */}
                <div className="row mb-2">
                    <label htmlFor="telnumber" className="form-label col-2 col-form-label">手機號碼</label>
                    <div className="col-12">
                        <input type="text" className={styles.inputframe} id="telnumber" placeholder=" 請輸入手機號碼" />
                    </div>
                </div>

                {/* 地址 */}
                <div className="row mb-2">
                    <label htmlFor="readdress" className="form-label col-12 col-form-label">地址</label>
                    <div className={styles.sortaddress}>
                        <select className={styles.selectbox}>
                            <option value="taipei">台北市</option>
                            <option value="taichung">台中市</option>
                        </select>
                    </div>
                    <div className={styles.sortaddress + " me-3"}>
                        <select className={styles.selectbox}>
                            <option value="district1">西屯區</option>
                            <option value="district2">北區</option>
                        </select>
                    </div>

                    <div className={styles.sortaddress2}>
                        <input type="text" className={styles.addressdetail} id="readdress" placeholder=" 請輸入地址" />
                    </div>
                </div>
                {/* part3 */}
                <div className={styles.buyertitle + " mt-3 pb-1"}>配送資訊</div>
                <div className="row mt-3 mb-2">
                    <label htmlFor="buyer" className="form-label col-2 col-form-label">配送時間</label>
                    <div className="col-12">
                        <input type="text" className={styles.inputframe} id="buyer" value=" 不指定"/>
                    </div>
                </div>

                <div className="container mt-5 d-flex justify-content-center">
                    <div className="row">
                        <div className="col-12">※下單前請再次確認您的購買明細及配送資訊，訂單成立後無法異動訂單內容</div>
                    </div>
                </div>

                <div className="container d-flex justify-content-center">
                <a href="/cart"><button className="btn btn-middle mt-5 mb-5 me-3">修改訂單</button></a>
                <a href="/cart/pay-method"><button className="btn btn-middle mt-5 mb-5 ms-3">前往付款方式</button></a>
                </div>
            </div>


        <Footer/>
   </>
  )
}
