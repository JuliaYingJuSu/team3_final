import React from 'react';
import RestaurantLayout from '@/components/restaurant/restaurant-layout';

export default function Home() {
  return (
    <RestaurantLayout>
      {/* 这里放置你的页面内容 */}
      <div className="mt-5">
        <h1>歡迎來到餐廳</h1>
        <p>這是內容</p>
      </div>
    </RestaurantLayout>
  );
}
