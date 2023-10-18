import Head from "next/head";
import Footer from "@/components/layout/default-layout/footer";
import Navbar from "@/components/layout/default-layout/navbar-main/index";
import Banner from "@/components/layout/default-layout/banner";
import Carousel from "@/components/layout/default-layout/carousel";
import CarouselProduct from "@/components/layout/default-layout/carousel-product";
import Section01 from "@/components/layout/default-layout/section01";
import Section02 from "@/components/layout/default-layout/section02";
import Section03 from "@/components/layout/default-layout/section03";
import { useState } from "react";

export default function Index() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  return (
    <>
      <Head>
        <title>食食嗑嗑-首頁</title>
      </Head>
      <Navbar></Navbar>
      <Banner
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      ></Banner>
      <Carousel
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
      ></Carousel>
      <Section01
        selectedCity={selectedCity}
        selectedStyle={selectedStyle}
        searchKeyword={searchKeyword}
      ></Section01>
      <Section02></Section02>
      <Section03></Section03>
      <CarouselProduct></CarouselProduct>
      <Footer></Footer>
    </>
  );
}
