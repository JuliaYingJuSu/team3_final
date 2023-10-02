import Head from "next/head";
import Navbar from "@/components/layout/default-layout/navbar-main/index";
import Banner from "@/components/book/banner";
import Carousel from "@/components/layout/default-layout/carousel";
import Footer from "@/components/layout/default-layout/footer";
import CardR3 from "@/components/layout/card-r3";
import Link from "next/link";

export default function Index() {
  return (
    <>
      <Head>
        <title>食食嗑嗑-餐廳總表</title>
      </Head>
      <Navbar></Navbar>
      <Banner></Banner>
      <Carousel></Carousel>
      <CardR3></CardR3>
      <CardR3></CardR3>
      <CardR3></CardR3>
      <CardR3></CardR3>
      <CardR3></CardR3>
      <Link href={"/"} className="middle grey fs18b mt-5 mb-5">
        看更多
      </Link>
      <Footer></Footer>
    </>
  );
}
