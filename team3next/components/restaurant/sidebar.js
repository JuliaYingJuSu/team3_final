import React from 'react';

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
            <span className='icon-member me-2' style={{fontSize:"32px"}}></span>
            <div className="option justify-content-center" style={{ width:"140px" }}>會員資料管理</div>
          </div>
        </button>
        <button type="button" className="btn d-flex justify-content-center px-4 mb-3">
          <div className="d-flex justify-content-between w-100">
          <span className='icon-edit me-2' style={{fontSize:"32px"}}></span>
            <div className="option justify-content-center" style={{ width:"140px" }}>餐廳資料維護</div>
          </div>
        </button>
        <button type="button" className="btn d-flex justify-content-center px-4 mb-3">
          <div className="d-flex justify-content-between w-100">
          <span className='icon-bell me-2' style={{fontSize:"32px"}}></span>
            <div className="option justify-content-center" style={{ width:"140px" }}>訂單管理</div>
          </div>
        </button>
        <button type="button" className="btn d-flex justify-content-center px-4 mb-3">
          <div className="d-flex justify-content-between w-100">
          <span className='icon-payment me-2' style={{fontSize:"28px"}}></span>
            <div className="option justify-content-center" style={{ width:"140px" }}>營業時間管理</div>
          </div>
        </button>
      </div>
      <style jsx>{`
        .option {
          font-size: 22px;
        }
        .icon-member:before,.icon-bell:before,.icon-edit:before,.icon-payment:before{
          color:black;
        }
      `}</style>
    </>
  );
}