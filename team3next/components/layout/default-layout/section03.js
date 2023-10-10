import React from "react";
import CardR2 from "@/components/layout/card-r2";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Test() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(process.env.API_SERVER + "/api/book/")
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        const groupedData = {};
        data.forEach(({ restaurant_id, ...rest }) => {
          if (!groupedData[restaurant_id]) {
            groupedData[restaurant_id] = {
              restaurant_id,
              ...rest,
            };
          }
        });

        const dataWithFirstImages = Object.values(groupedData).map((item) => {
          return item;
        });

        setData(dataWithFirstImages);
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
                restaurant_address,
                restaurant_phone,
                restaurant_info,
              },
              i
            ) => {
              return (
                <CardR2
                  key={restaurant_id}
                  restaurant_id={restaurant_id}
                  restaurant_name={restaurant_name}
                  restaurant_city={restaurant_city}
                  restaurant_address={restaurant_address}
                  restaurant_phone={restaurant_phone}
                  restaurant_info={restaurant_info}
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
