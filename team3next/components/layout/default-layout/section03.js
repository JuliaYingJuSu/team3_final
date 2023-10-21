import React from "react";
import CardR2 from "@/components/layout/card-r2";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Section03() {
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

        for (let i = dataWithFirstImages.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [dataWithFirstImages[i], dataWithFirstImages[j]] = [
            dataWithFirstImages[j],
            dataWithFirstImages[i],
          ];
        }

        setData(dataWithFirstImages.slice(0, 3));
      })
      .catch((ex) => console.log(ex));
  }, []);
  return (
    <>
      <div className="mt-5 container">
        <h4 className="h4-title mb-4">熱門餐廳</h4>
        <div className="row row-cols-1 row-cols-lg-3 container mx-auto">
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
                restaurant_opening,
              },
              i
            ) => {
              return (
                <CardR2
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
                  restaurant_opening={restaurant_opening}
                />
              );
            }
          )}
        </div>
        <Link href={"/"} className="middle grey fs18b mt-5">
          看更多
        </Link>
      </div>
      ;
    </>
  );
}
