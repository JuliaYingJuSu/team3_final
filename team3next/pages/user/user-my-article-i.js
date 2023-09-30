import React from "react";
import Link from "next/link";
import Head from "next/head";
import MyNavbar from "@/components/layout/default-layout/navbar-main";
import WhoInfo from "@/components/user/who-info";

export default function UserMyArticleI() {
  return (
    <>
    <MyNavbar></MyNavbar>
    <WhoInfo></WhoInfo>
      <Head>
        <title>XXX的文章</title>
      </Head>
    </>
  );
}
