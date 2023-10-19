import React from "react";
import MemberOrder from "@/components/restaurant-member/restaurant-order";
import RestaurantLayout from "@/components/restaurant-member/restaurant-layout";

export default function MemberOrdersPage() {
  return (
    <>
      <RestaurantLayout>
        <MemberOrder />
      </RestaurantLayout>
    </>
  );
}
