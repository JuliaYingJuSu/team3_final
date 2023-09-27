import React from 'react'
import styles from "./nav-cart.module.css"

export default function NavCart() {
  return (
    <>
        <div className="d-flex w-100 border-top border-bottom py-3">
                      <div className='w-50'><img className="img-fluid" src="https://rs.joo.com.tw/website/uploads_product/website_1060/P0106000282607_3_1674263.jpg?_4431" alt="檸檬大叔"/></div>
                        <div className="container">
                          <div className="row justify-content-center">
                            <div className="col-12">【檸檬大叔】100%純檸檬磚(12入/盒)</div>
                            <div className="col-6 pt-2">售價</div>
                            <div className="col-6 pt-2">320</div>
                            <div className="col-6 pt-2">數量</div>
                            <div className="col-6 pt-2">1</div>
                          </div>
                        </div>
        </div>            
         <div className={styles.checkout + " d-grid col-12 mx-auto mt-4"}><button className= "btn align-items-center" >結帳</button></div>
    </>
  )
}
