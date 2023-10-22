/* eslint-disable @next/next/no-img-element */
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import UserNavbar from "@/components/user/user-navbar";
import Head from "next/head";
import UserInformation from "@/components/user/user-information";
import UserInfo from "@/components/user/user-info";
import Footer from "@/components/layout/default-layout/footer";


export default function UserIndex() {
  return (
    <>
      <MyNavbar></MyNavbar>
      <UserInfo></UserInfo>
      <UserNavbar />
      <UserInformation />
      <Footer></Footer>
      <Head>
        <title>食食嗑嗑-會員資訊</title>
    </Head>
    </>
  );
}
