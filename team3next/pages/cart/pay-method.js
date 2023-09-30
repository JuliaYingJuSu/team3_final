import React from 'react'
import styles from "./pay-method.module.css"
import MyNavbar from '@/components/layout/default-layout/navbar-main/index'
import Footer from '@/components/layout/default-layout/footer'
import style from '@/pages/product/list.module.css'
import secstyle from './del-detail.module.css'
import productDetail from '@/pages/product/[pid]'

export default function PayMethod() {
  return (
    <>
        <MyNavbar/>

{/* 商城bar */}
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
        <div className={secstyle.sectionBar + " mt-5"}>
            {/* <div className="w-75 d-flex justify-content-between"> */}
                <a href="" className={secstyle.step}>
                    <p className="text-start ">顧客</p>
                </a>

                <a href="" className={secstyle.step}>
                    <p className="text-start">配送</p>
                </a>
 
                <a href="" className={secstyle.step}>
                    <p className="text-start">付款</p>
                </a>

                <a href="" className={secstyle.lastStep}>
                    <p className="text-start">檢視</p>
                </a>

            {/* </div> */}

        </div>

{/* 付款方式 */}
            <div className="container d-flex justify-contet-center flex-column mt-5 w-50"> 
                    <p className={styles.pay + " pb-1"}>付款方法</p>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="payMethodRadio" id="sevenPay" value="seven" />
                        <label className={styles.payFontt + " form-check-label mb-2"} htmlFor="sevenPay">
                        超商取貨付款
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="payMethodRadio" id="linePay" value="line" />
                        <label className={styles.payFontt + " form-check-label mb-2"} htmlFor="linePay">
                        LINE PAY
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="payMethodRadio" id="cash" value="bycash" />
                        <label className={styles.payFontt + " form-check-label mb-2"} htmlFor="cash">
                        貨到付款(現金)
                        </label>
                    </div>
            </div>

{/* 發票資訊 */}
            <div className="container mt-4 w-50"> 
                    <p className={styles.pay + " pb-1"}>發票資訊</p>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="invoice1" value="cloudInvoice" />
                        <label className={styles.payFontt + " form-check-label"} htmlFor="invoice1">電子發票 E-Invoice</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="invoice1" value="cloudInvoice" />
                        <label className={styles.payFontt + " form-check-label"} htmlFor="invoice1">捐贈發票</label>
                    </div>
            </div>


            <div className="form-check container d-flex justify-content-center my-5 fs14">
                <input className="form-check-input" type="checkbox" value="" id="agreecheck" />
                <label className="form-check-label" htmlFor="agreecheck">
                    我同意接受 服務條款 & 隱私權政策
                </label>
            </div>

            <div className="container d-flex justify-content-center fs12">
                <div className="row">
                    <div className="col-12">※下單前請再次確認您的購買明細及配送資訊，訂單成立後無法異動訂單內容</div>
                </div>
            </div>

                <div className="container d-flex justify-content-center my-5">
                    <button className="btn btn-middle">前往結帳</button>
                </div>
        <Footer/>
    </>
  )
}
