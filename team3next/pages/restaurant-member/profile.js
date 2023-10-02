import React from "react";
import RestaurantLayout from "@/components/restaurant-member/restaurant-layout";
import Profile from "@/components/restaurant-member/restaurant-profile";

export default function Home() {
  return (
    <RestaurantLayout>
      <Profile />
    </RestaurantLayout>
  );
}
