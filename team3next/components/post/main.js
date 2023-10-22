import React from "react";
import Card from "../layout/card";
import { useEffect, useState, useContext } from "react";
import AuthContext from "@/hooks/AuthContext";
import Head from "next/head";

export default function Main({ selectedCity, selectedStyle, searchKeyword }) {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  const [displayData, setDisplayData] = useState([]);
  const [displayCount, setDisplayCount] = useState(24); // 顯示的卡片數量
  const [favs, setFavs] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [likes, setLikes] = useState([]);
  // console.log('main:', {selectedCity})
  // console.log('main:', {selectedStyle})
  // console.log('main:',{searchKeyword})
  const [clickCity, setClickCity] = useState("");
  const [clickStyle, setClickStyle] = useState("");

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
        setDisplayData(dataWithFirstImages);
      })
      .catch((ex) => console.log(ex));
  }, []);

  // 下載更多卡片
  const loadMoreData = () => {
    setDisplayCount(displayCount + 24); // 增加顯示的卡片數量
  };

  // 滾動事件監聽器，檢測用戶是否接近頁面底部
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMoreData(); // 當用戶接近頁面底部時下載更多卡片
    }
  };
  useEffect(() => {
    // 添加滾動事件監聽器
    window.addEventListener("scroll", handleScroll);
    return () => {
      // 在組件卸載時移除事件監聽器
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let newData = data
      .slice(0, displayCount)
      .filter((city) => {
        if (selectedCity) {
          return city.restaurant_city === selectedCity;
        } else if (clickCity) {
          return city.restaurant_city === clickCity; 
        } else {
          return true; // 如果没有選擇城市，不過濾城市
        }
      })
      .filter((style) => {
        if (selectedStyle) {
          return style.food_tag_names.indexOf(selectedStyle) >= 0;
        } else if (clickStyle) {
          return style.food_tag_names.indexOf(clickStyle) >= 0;
        } else {
          return true; // 如果没有選擇標籤，不過濾標籤
        }
      })
      .filter((post) => {
        if (searchKeyword) {
          // 使用 includes 方法檢查標題或標籤是否包含關鍵字（不區分大小寫）
          return (
            post.post_title
              .toLowerCase()
              .includes(searchKeyword.toLowerCase()) ||
            post.food_tag_name
              .toLowerCase()
              .includes(searchKeyword.toLowerCase()) ||
            post.post_content
              .toLowerCase()
              .includes(searchKeyword.toLowerCase())
          );
        } else {
          return true; // 如果没有輸入搜索關鍵字，不過濾關鍵字
        }
      });

    setDisplayData(newData);
  }, [
    selectedCity,
    selectedStyle,
    searchKeyword,
    favs,
    likes,
    followed,
    data,
    displayCount,
    clickCity,
    clickStyle,
  ]);

  //接收加入收藏資料庫資料
  useEffect(() => {
    if (auth && auth.token)
      fetch(process.env.API_SERVER + "/api/post/fav", {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
        .then((r) => r.json())
        .then((f) => {
          setFavs(f);
        })
        .catch((ex) => console.log(ex));
  }, [auth]);

  //接收加入追蹤資料庫資料
  useEffect(() => {
    if (auth && auth.token)
      fetch(process.env.API_SERVER + "/api/post/follow", {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
        .then((r) => r.json())
        .then((f) => {
          setFollowed(f);
        })
        .catch((ex) => console.log(ex));
  }, [auth]);

  //接收加入收藏資料庫資料
  useEffect(() => {
    if (auth && auth.token)
      fetch(process.env.API_SERVER + "/api/post/like", {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
        .then((r) => r.json())
        .then((f) => {
          setLikes(f);
        })
        .catch((ex) => console.log(ex));
  }, [auth]);

  return (
    <>
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-3 mx-auto">
          {displayData.map(
            ({
              post_id,
              post_title,
              post_content,
              createTime,
              post_image_name,
              restaurant_city,
              restaurant_name,
              food_tag_names,
              user_id,
              food_tag_name,
            }) => {
              const nickname = userData && userData[user_id]?.nickname;
              const user_img = userData && userData[user_id]?.user_img;

              return (
                <Card
                  key={post_id}
                  post_id={post_id}
                  favs={favs}
                  setFavs={setFavs}
                  followed={followed}
                  setFollowed={setFollowed}
                  likes={likes}
                  setLikes={setLikes}
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
                  food_tag_name={food_tag_name}
                  clickCity={clickCity}
                  setClickCity={setClickCity}
                  clickStyle={clickStyle}
                  setClickStyle={setClickStyle}
                />
              );
            }
          )}
          {/* <Link href={"/"} className="middle grey fs18b mx-auto my-3">
            看更多
          </Link> */}
        </div>
      </div>
      <Head>
        <title>食食嗑嗑-食好料</title>
      </Head>
    </>
  );
}
