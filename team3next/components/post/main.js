import React from "react";
import Card from "../layout/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Main() {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    fetch("http://localhost:3002/post")
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        const groupedData = {};
        data.forEach(({ post_id, ...rest }) => {
          if (groupedData[post_id]) {
            groupedData[post_id].food_tag_names.push(rest.food_tag_name);
          } else {
            groupedData[post_id] = {
              post_id,
              ...rest,
              food_tag_names: [rest.food_tag_name],
            };
          }
        });

        // 获取每个 post_id 的第一张 post_image
        const dataWithFirstImages = Object.values(groupedData).map((item) => {
          // 如果有多个 post_image，选择第一个
          if (Array.isArray(item.post_image_name)) {
            item.post_image_name = item.post_image_name[0];
          }
          return item;
        });

        setData(dataWithFirstImages);
      })
      .catch((ex) => console.log(ex));
  }, []);


  return (
    <>
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-3 mx-auto">
          {data.map(
            ({
              post_id,
              post_title,
              post_content,
              createTime,
              post_image_name,
              restaurant_city,
              restaurant_name,
              food_tag_names,
            },i) => {
              return (
                <Card
                  key={post_id}
                  post_id={post_id}
                  post_title={post_title}
                  post_content={post_content}
                  createTime={createTime}
                  post_image_name={post_image_name}
                  restaurant_city={restaurant_city}
                  restaurant_name={restaurant_name}
                  food_tag_names={food_tag_names}
                />
              );
            }
          )}
          <Link href={"/"} className="middle grey fs18b mx-auto my-3">
            看更多
          </Link>
        </div>
      </div>
    </>
  );
}












