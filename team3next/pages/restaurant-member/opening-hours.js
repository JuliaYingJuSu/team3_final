import React from "react";
import RestaurantLayout from "@/components/restaurant/restaurant-layout";
import OpeningHours from "@/components/restaurant/restaurant-opening-hours";

export default function Home() {
  return (
    <RestaurantLayout>
      <OpeningHours />
    </RestaurantLayout>
  );
}
