import Head from "next/head";
import Navbar from "@/components/layout/default-layout/navbar-main/index";
import Banner from "@/components/book/banner";
import Carousel from "@/components/layout/default-layout/carousel";
import Footer from "@/components/layout/default-layout/footer";

export default function Index() {
  return (
    <>
      <Head>
        <title>食食嗑嗑-餐廳主頁</title>
      </Head>
      <Navbar></Navbar>
      <img src="../../images/book/r1-1cut.png" alt="..." />
      <Footer></Footer>
    </>
  );
}
