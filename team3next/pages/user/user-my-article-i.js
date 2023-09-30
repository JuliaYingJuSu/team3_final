import React from "react";
import Link from "next/link";
import Head from "next/head";
import MyNavbar from "@/components/layout/default-layout/navbar-main";

export default function UserMyArticleI() {
  return (
    <>
    <MyNavbar></MyNavbar>
      <Head>
        <title>XXX的文章</title>
      </Head>
    </>
  );
}
