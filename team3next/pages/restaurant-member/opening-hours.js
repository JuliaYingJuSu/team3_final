import React from "react";
import RestaurantLayout from "@/components/restaurant-member/restaurant-layout";
import OpeningHours from "@/components/restaurant-member/restaurant-opening-hours";

export default function OpeningHoursPage() {
  return (
    <RestaurantLayout>
      <OpeningHours />
    </RestaurantLayout>
  );
}
