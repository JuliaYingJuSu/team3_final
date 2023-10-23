/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Carousel() {
  const [recommendProduct, setRecommendProduct] = useState([]);
  console.log(recommendProduct);
  //取推薦商品資料
  useEffect(() => {
    axios
      .post("http://localhost:3002/api/product/product-recommend")
      .then((res) => {
        console.log(res.data);
        setRecommendProduct(res.data.rowsRecommendFront);
      });
  }, []);

  //修改左右箭頭樣式
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", fontSize: 33 }}
        onClick={onClick}
      >
        <span className="icon-arrow-s-right"></span>
      </div>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          fontSize: 33,
        }}
        onClick={onClick}
      >
        <span className="icon-arrow-s-left"></span>
      </div>
    );
  }

  //調整輪播牆設定
  const settings = {
    className: "center",
    infinite: true,
    // centerPadding: "100px",
    slidesToShow: 6,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  return (
    <>
      <div className="container my-5">
        <h4 className="h4-title mb-4">熱門商品</h4>
        <div>
          {/* 輪播牆區塊 */}
          <Slider {...settings}>
            {recommendProduct?.map((v, i) => {
              return (
                <div className="middle">
                  <div
                    className="middle mt-2 rounded-circle overflow-hidden "
                    style={{ width: "160px", height: "160px" }}
                  >
                    <Link href={"/product/" + v.product_id}>
                      <img
                        src={"/images/product/" + v.product_img}
                        className="c-card-img object-cover"
                      ></img>
                    </Link>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}
