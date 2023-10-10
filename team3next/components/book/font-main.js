import React from "react";
import CardR3 from "@/components/layout/card-r3";
import { useEffect, useState } from "react";

export default function FontMain() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(process.env.API_SERVER + "/api/book/")
      .then((r) => r.json())
      .then((data) => {
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

        // 按降冪排序
        dataWithFirstImages.sort((a, b) => b.restaurant_id - a.restaurant_id);

        setData(dataWithFirstImages);
      })
      .catch((ex) => console.log(ex));
  }, []);

  return (
    <>
      {data.map(
        ({
          restaurant_id,
          restaurant_name,
          restaurant_city,
          restaurant_district,
          restaurant_address,
          restaurant_phone,
          restaurant_info,
          r_img_route,
          food_tag_names,
        }) => {
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
    </>
  );
}
