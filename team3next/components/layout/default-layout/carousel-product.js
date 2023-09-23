/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Image from "next/image";
import Slider from "react-slick";

export default function Carousel() {
  //修改左右箭頭樣式
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
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
          background: "black",
          right: "1rem",
        }}
        onClick={onClick}
      />
    );
  }

  //調整輪播牆設定
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,
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
            <div className="middle">
              <div className="middle mt-2">
                  <img
                    src="./images/product/chocolate.png"
                    alt="商品1"
                    className="c-card-img"></img>
              </div>
            </div>
            <div className="middle">
              <div className="middle mt-2">
                  <img
                    src="./images/product/coffee01.jpg"
                    alt="商品2"
                    className="c-card-img"></img>
              </div>
            </div>
            <div className="middle">
              <div className="middle mt-2">
                  <img
                    src="./images/product/cookie01.png"
                    alt="商品3"
                    className="c-card-img"></img>
              </div>
            </div>
            <div className="middle">
              <div className="middle mt-2">
                  <img
                    src="./images/product/cookie02.png"
                    alt="商品4"
                    className="c-card-img"></img>
              </div>
            </div>
            <div className="middle">
              <div className="middle mt-2">
                  <img
                    src="./images/product/granola.png"
                    alt="商品5"
                    className="c-card-img"></img>
              </div>
            </div>
            <div className="middle">
              <div className="middle mt-2">
                  <img
                    src="./images/product/spark.jpg"
                    alt="商品6"
                    className="c-card-img"></img>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
}
