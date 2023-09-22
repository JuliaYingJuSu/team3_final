import Head from "next/head";
import Footer from "@/components/layout/default-layout/footer";
import Navbar from "@/components/layout/default-layout/navbar-main/index"
import Banner from "@/components/layout/default-layout/banner";
import Carousel from "@/components/layout/default-layout/carousel";


export default function Index() {
  return (
    <>
    <Head>
        <title>食食嗑嗑-首頁</title>
    </Head>
    <Navbar></Navbar>
    <Banner></Banner>
    <Carousel></Carousel>
    <Footer></Footer>  
    </>
  )
}
