import React from "react";
import CardR2 from "@/components/layout/card-r2";
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
      <div className="container">
        {data.map(
          (
            {
              restaurant_id,
              restaurant_name,
              restaurant_city,
              restaurant_address,
              restaurant_phone,
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
              />
            );
          }
        )}
      </div>
    </>
  );
}
