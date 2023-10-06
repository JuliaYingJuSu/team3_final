import React from "react";
import Card from "../layout/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Articles() {
  const [data, setData] = useState(
    []
    //   {
    //   post_id:"",
    //   post_image_name:"",
    //   likes:"",
    //   comment:"",
    //   favorite:"",
    //   city:"",
    //   food_tags:"",
    //   title:"",
    // }
  );

  useEffect(() => {
    fetch("http://localhost:3002/post")
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setData(data);
        console.log("hello");
      })
      .catch((ex) => console.log(ex));
  }, []);
  return (
    <>
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-3 mx-auto">
          {data?.map((v, i) => {
            return <Card key={v.post_id} />;
          })}

          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Link href={"/"} className="middle grey fs18b mx-auto my-3">
            看更多
          </Link>
        </div>
      </div>
    </>
  );
}
