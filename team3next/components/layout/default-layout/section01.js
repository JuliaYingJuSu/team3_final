import React from "react";
import Card from "../card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Section01() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // 取得用戶資訊，這個 fetch 的示範
    fetch(process.env.API_SERVER + "/")
      .then((r) => r.json())
      .then((users) => {
        const usersData = {};
        users.forEach(({ user_id, nickname, user_img }) => {
          usersData[user_id] = { nickname, user_img };
        });
        setUserData(usersData);
      })
      .catch((ex) => console.log(ex));
  }, []); // 只在元件首次載入時執行

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

        // 只保留前三個 post_id 的資料
        setData(dataWithFirstImages.slice(0, 3));
      })
      .catch((ex) => console.log(ex));
  }, []);

  return (
    <>
      <div className="container">
        <h4 className="h4-title mb-4">熱門食記</h4>
        <div className="row row-cols-1 row-cols-lg-3 container mx-auto">
          {data.map(
            (
              {
                post_id,
                post_title,
                post_content,
                createTime,
                post_image_name,
                restaurant_city,
                restaurant_name,
                food_tag_names,
                user_id,
              },
              i
            ) => {
              const nickname = userData && userData[user_id].nickname;
              const user_img = userData && userData[user_id].user_img;
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
                  user_id={user_id}
                  nickname={nickname}
                  user_img={user_img}
                />
              );
            }
          )}
        </div>
        <Link href="/post" className="middle grey fs18b mt-5">
          看更多
        </Link>
      </div>
    </>
  );
}
