import React from "react";
import RestaurantLayout from "@/components/restaurant-member/restaurant-layout";
import memberRegister from "@/components/restaurant-member/restaurant-register";

export default function memberRegisterPage() {
  return (
    <RestaurantLayout>
      <memberRegister />
    </RestaurantLayout>
  );
}
