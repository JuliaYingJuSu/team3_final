import React from 'react'
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import UserNavbar from "@/components/user/user-navbar";
import Head from "next/head";
import UserInfo from "@/components/user/user-info";
import Footer from "@/components/layout/default-layout/footer";


export default function MyBook() {
  return (
    <>
    <MyNavbar></MyNavbar>
    <UserInfo></UserInfo>
      <UserNavbar />
      <Footer></Footer>
      <Head>
        <title>訂位紀錄</title>
      </Head>
    </>
  )
}
