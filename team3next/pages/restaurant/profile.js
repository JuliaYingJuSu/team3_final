import React from "react";
import RestaurantLayout from "@/components/restaurant/restaurant-layout";
import Profile from "@/components/restaurant/restaurant-profile";

export default function Home() {
  return (
    <RestaurantLayout>
      <Profile />
    </RestaurantLayout>
  );
}
