import React from "react";
import Card from "../layout/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Main() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectedCity, setSelectedCity] = useState("");

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
          // console.log(item.post_image_name)
          if (Array.isArray(item.post_image_name)) {
            item.post_image_name = item.post_image_name[0];
          }
          return item;
        });

        // 按降冪排序
        dataWithFirstImages.sort((a, b) => b.post_id - a.post_id);

        setData(dataWithFirstImages);
      })
      .catch((ex) => console.log(ex));
  },[]);
  // useEffect(() => {
  //   const filteredData = selectedCity
  //     ? data.filter(
  //         (city) => city.restaurant_city === selectedCity
  //       ): data;
  //   setData(filteredData);
    
  // });

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
              user_id, // 增加 user_id 屬性
            }) => {
              const nickname = userData[user_id].nickname;
              const user_img = userData[user_id].user_img;
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
          {/* <Link href={"/"} className="middle grey fs18b mx-auto my-3">
            看更多
          </Link> */}
        </div>
      </div>
    </>
  );
}
