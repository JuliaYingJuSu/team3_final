import React from "react";
import RestaurantLayout from "@/components/restaurant/restaurant-layout";

export default function Home() {
  return (
    <RestaurantLayout>
      <div className="mt-5">
        <h3 style={{color:"#B6705E"}}>會員資料管理</h3>
        <p>這是內容</p>
      </div>
    </RestaurantLayout>
  );
}
