import React from "react";
import Card from "../layout/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Articles() {
  const [data, setData] = useState([]);

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
                food_tag_name,

                
              },
              i
            ) => {
              return <Card 
              key={post_id} 
              post_title={post_title}
              post_content={post_content}
              createTime={createTime}
              post_image_name={post_image_name}
              restaurant_city={restaurant_city} 
              restaurant_name={restaurant_name}
              food_tag_name={food_tag_name}
              
              />;
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
