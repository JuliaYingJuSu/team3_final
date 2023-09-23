import Head from "next/head";
import Footer from "@/components/layout/default-layout/footer";
import Navbar from "@/components/layout/default-layout/navbar-main/index"
import Banner from "@/components/layout/default-layout/banner";
import Carousel from "@/components/layout/default-layout/carousel";
import CarouselProduct from "@/components/layout/default-layout/carousel-product"
import Section01 from "@/components/layout/default-layout/section01";
import Section02 from "@/components/layout/default-layout/section02";


export default function Index() {
  return (
    <>
    <Head>
        <title>食食嗑嗑-首頁</title>
    </Head>
    <Navbar></Navbar>
    <Banner></Banner>
    <Carousel></Carousel>
    <Section01></Section01>
    <Section02></Section02>
    <CarouselProduct></CarouselProduct>
    <Footer></Footer>  
    </>
  )
}
