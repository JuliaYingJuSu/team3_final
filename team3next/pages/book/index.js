import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "@/components/layout/default-layout/navbar-main/index";
import Banner from "@/components/book/banner";
import Carousel from "@/components/layout/default-layout/carousel";
import Footer from "@/components/layout/default-layout/footer";
import FontMain from "@/components/book/font-main";
import CardR3 from "@/components/layout/card-r3";
import Link from "next/link";
import BreadcrumbIndex from "@/components/book/breadcrumb-index";

export default function Index() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/api/book", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);
        const groupedData = {};
        data.forEach(({ restaurant_id, ...rest }) => {
          if (groupedData[restaurant_id]) {
            groupedData[restaurant_id].food_tag_names.push(rest.food_tag_name);
          } else {
            groupedData[restaurant_id] = {
              restaurant_id,
              ...rest,
              food_tag_names: [rest.food_tag_name],
            };
          }
        });

        const dataWithFirstImages = Object.values(groupedData).map((item) => {
          if (Array.isArray(item.r_img_route)) {
            item.r_img_route = item.r_img_route[0];
          }
          return item;
        });

        setData(dataWithFirstImages);
      });
  }, []);
  return (
    <>
      <Head>
        <title>食食嗑嗑-餐廳總表</title>
      </Head>
      <Navbar></Navbar>
      <Banner></Banner>
      <Carousel></Carousel>
      <div className="container d-flex justify-content-center">
        <div style={{ width: "80%" }}>
          <BreadcrumbIndex></BreadcrumbIndex>
        </div>
      </div>

      <div>
        {data.map(
          (
            {
              restaurant_id,
              restaurant_name,
              restaurant_city,
              restaurant_district,
              restaurant_address,
              restaurant_phone,
              restaurant_info,
              r_img_route,
              food_tag_names,
            },
            i
          ) => {
            return (
              <CardR3
                key={restaurant_id}
                restaurant_id={restaurant_id}
                restaurant_name={restaurant_name}
                restaurant_city={restaurant_city}
                restaurant_district={restaurant_district}
                restaurant_address={restaurant_address}
                restaurant_phone={restaurant_phone}
                restaurant_info={restaurant_info}
                r_img_route={r_img_route}
                food_tag_names={food_tag_names}
              />
            );
          }
        )}
      </div>

      <Link href={""} className="middle grey fs18b mt-5 mb-5">
        看更多
      </Link>
      <Footer></Footer>
    </>
  );
}
