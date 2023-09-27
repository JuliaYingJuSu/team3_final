import React from 'react'
import styles from "./pay-method.module.css"
import MyNavbar from '@/components/layout/default-layout/navbar-main/index'
import Footer from '@/components/layout/default-layout/footer'


export default function PayMethod() {
  return (
    <>
        <MyNavbar/>
            <div className="container d-flex justify-contet-center flex-column"> 
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

            <div className="container"> 
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


            <div className="form-check container d-flex justify-content-center my-5">
                <input className="form-check-input" type="checkbox" value="" id="agreecheck" />
                <label className="form-check-label" htmlFor="agreecheck">
                    我同意接受 服務條款 & 隱私權政策
                </label>
            </div>

            <div className="container d-flex justify-content-center">
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
