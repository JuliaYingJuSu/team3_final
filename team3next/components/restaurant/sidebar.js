import React from 'react';
import Image from 'next/image';
import edit from '@/public/icon/edit.svg';
import bell from '@/public/icon/bell.svg';
import user from '@/public/icon/user.svg';
import creditCard from '@/public/icon/credit-card.svg';

export default function RestaurantSidebar() {
  return (
    <>
      <div
        className="btn-group-vertical mt-5"
        role="group"
        aria-label="Vertical button group"
      >
        <button type="button" className="btn d-flex justify-content-center px-4 mb-3">
          <div className="d-flex justify-content-between w-100 ">
            <Image className="me-2" src={user} alt="edit" />
            <div className="option justify-content-center" style={{ width:"140px" }}>會員資料管理</div>
          </div>
        </button>
        <button type="button" className="btn d-flex justify-content-center px-4 mb-3">
          <div className="d-flex justify-content-between w-100">
            <Image className="me-2" src={edit} alt="edit" />
            <div className="option justify-content-center" style={{ width:"140px" }}>餐廳資料維護</div>
          </div>
        </button>
        <button type="button" className="btn d-flex justify-content-center px-4 mb-3">
          <div className="d-flex justify-content-between w-100">
            <Image className="me-2" src={bell} alt="edit" />
            <div className="option justify-content-center" style={{ width:"140px" }}>訂單管理</div>
          </div>
        </button>
        <button type="button" className="btn d-flex justify-content-center px-4 mb-3">
          <div className="d-flex justify-content-between w-100">
            <Image className="me-2" src={creditCard} alt="edit" />
            <div className="option justify-content-center" style={{ width:"140px" }}>營業時間管理</div>
          </div>
        </button>
      </div>
      <style jsx>{`
        .option {
          font-size: 22px;
        }
      `}</style>
    </>
  );
}
