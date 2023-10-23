import React from "react";
import RestaurantLayout from "@/components/restaurant-member/restaurant-layout";
import PulseMascot from "../pulse-test";

export default function HomePage() {
  return (
    <RestaurantLayout>
      <h1>請點擊左側功能</h1>
      {/* <div className="position-absolute h-100 bottom-0 end-0">
        <PulseMascot />
      </div> */}
    </RestaurantLayout>
  );
}
