import React from "react";
import Card from "../layout/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Main() {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    fetch(process.env.API_SERVER + "/api/post/")
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

        // 獲取每個 post_id 的第一張 post_image
        const dataWithFirstImages = Object.values(groupedData).map((item) => {
          // 如果有多個 post_image，選擇第一個
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
              likes,
              post_favorite,
              nickname,
              user_id,
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
                  likes={likes}
                  post_favorite={post_favorite}
                  nickname={nickname}
                  user_id={user_id}
                />
              );
            }
          )}
          {/* <Link href={"/"} className="middle grey fs18b mx-auto my-3">
            看更多
          </Link> */}
        </div>
      </div>
    </>
  );
}












