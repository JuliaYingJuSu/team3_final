import React from "react";

export default function handleAddCart(props) {
  // if (router.isReady) {
  //   const pathName = router.query.pid;

  //1如果有登入
  if (localStorage.getItem("auth")) {
    console.log(localStorage.getItem("auth"));
    //2如果商品已經設定到data了(防useEffect錯)
    if (data.rows.product_id) {
      console.log(data.rows.product_id);
      //3如果localStorage已有購物車資料
      if (localStorage.getItem("cart")) {
        console.log(localStorage.getItem("cart"));
        //拿出來找找看裡面有沒有目前頁面商品
        let cart = JSON.parse(localStorage.getItem("cart"));
        console.log(v.product_id, router.query.pid);
        const existCart = cart.findIndex(
          (v) => v.product_id == router.query.pid
        );
        //4如果localStorage cart有目前頁面商品 >>> 更新數量設定回去
        if (existCart >= 0) {
          const updateQuantity = cart[existCart].quantity + quantity;

          const cartUpdateIndex = {
            ...cart[existCart],
            quantity: updateQuantity,
          };
          cart[existCart] = cartUpdateIndex;
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          //4如果localStorage cart沒有目前頁面商品 >>> 在cart陣列增一筆新的
          cart.unshift({
            product_id: data.rows.product_id,
            product_img: data.rowsImgs[0].product_img,
            quantity: quantity,
          });
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      } else {
        //3如果localStorage沒有購物車資料 >>> setItem
        const cart = [
          {
            product_id: data.rows.product_id,
            product_img: data.rowsImgs[0].product_img,
            quantity: quantity,
          },
        ];
        localStorage.setItem("cart", JSON.stringify(cart));

        //????? console.log(cart) >>> {} rather than [{}]
        // const cart = [
        //   JSON.stringify({
        //     product_id: data.rows.product_id,
        //     product_img: data.rowsImgs[0].product_img,
        //     quantity: quantity,
        //   }),
        // ];
        // localStorage.setItem("cart", cart);
      }
    }
  }
  // }
}
