/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Link from "next/link";
import Slider from "react-slick";

export default function Carousel() {
  //修改左右箭頭樣式
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", fontSize: 33 }}
        onClick={onClick}>
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
        onClick={onClick}>
        <span className="icon-arrow-s-left"></span>
      </div>
    );
  }

  //調整輪播牆設定
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

 
  return (
    <>
      <div className="container my-4">
        {/* 輪播牆區塊 */}
        <div>
          <Slider {...settings}>
            <div className="middle">
              <div className="c-card middle">
                <div className="mt-2">
                  <Link href="#">
                    <img
                      src="/images/food-1106513_1920.jpg"
                      className="w-100 c-card-img rounded-circle"></img>
                  </Link>
                </div>
                <div>
                  <span className="c-card-text fs18b pb-4">台式</span>
                </div>
              </div>
            </div>
            <div className="middle">
              <div className="c-card middle">
                <div className="mt-2">
                  <img
                    src="/images/test/c1.jpg"
                    alt="台式"
                    className="w-100 c-card-img rounded-circle"></img>
                </div>
                <div className="middle">
                  <span className="c-card-text fs18b pb-4">中式</span>
                </div>
              </div>
            </div>
            <div className="middle c-card ">
              <div className="c-card middle">
                <div className="mt-2">
                  <img
                    src="/images/test/j1.jpg"
                    alt="台式"
                    className="w-100 c-card-img rounded-circle"></img>
                </div>
                <div>
                  <span className="c-card-text fs18b pb-4">日式</span>
                </div>
              </div>
            </div>
            <div className="middle">
              <div className="c-card middle">
                <div className="mt-2">
                  <img
                    src="/images/test/k1.jpg"
                    alt="台式"
                    className="w-100 c-card-img rounded-circle"></img>
                </div>
                <div>
                  <span className="c-card-text fs18b pb-4">韓式</span>
                </div>
              </div>
            </div>
            <div className="middle">
              <div className="c-card middle">
                <div className="mt-2">
                  <img
                    src="/images/test/h1.jpg"
                    alt="台式"
                    className="w-100 c-card-img rounded-circle"></img>
                </div>
                <div>
                  <span className="c-card-text fs18b pb-4">港式</span>
                </div>
              </div>
            </div>
            <div className="middle">
              <div className="c-card middle">
                <div className="mt-2">
                  <img
                    src="/images/test/a1.jpg"
                    alt="台式"
                    className="w-100 c-card-img rounded-circle"></img>
                </div>
                <div>
                  <span className="c-card-text fs18b pb-4">美式</span>
                </div>
              </div>
            </div>
            <div className="middle">
              <div className="c-card middle">
                <div className="mt-2">
                  <img
                    src="/images/test/i1.jpg"
                    alt="台式"
                    className="w-100 c-card-img rounded-circle"></img>
                </div>
                <div>
                  <span className="c-card-text fs18b pb-4">義式</span>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <style global jsx>
        {`
           {
            /* 輪播牆卡片樣式 */
          }
          .c-card-img {
            width: 160px;
            height: 160px;
            object-fit: cover;
          }
          .c-card {
            height: 220px;
            width: 170px;
            flex-direction: column;
            gap: 10px;
          }
          .c-card-text {
            display: flex;
            width: 43px;
            height: 49px;
            flex-direction: column;
            justify-content: center;
          }
          .slick-arrow.slick-next:before {
            content: "";
          }

          .slick-arrow.slick-prev:before {
            content: "";
          }
          @media screen and (max-width: 500px) {
            .c-card-img {
              width: 80px;
              height: 80px;
            }
            .c-card {
              height: 110px;
              width: 80px;
            }
            .c-card-text {
              width: 36px;
              height: 22px;
            }
          }
        `}
      </style>
    </>
  );
}
