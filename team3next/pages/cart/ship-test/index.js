import { useState, useEffect } from "react";

import { useShip711StoreOpener } from "@/hooks/use-ship-711-store";

export default function Index() {
  const { store711, openWindow, closeWindow } = useShip711StoreOpener(
    "http://localhost:3002/api/shipment/711",
    { autoCloseMins: 3 } // x分鐘沒完成選擇會自動關閉，預設5分鐘。
  );

  return (
    <>
      <div>
        <button
          onClick={() => {
            openWindow();
          }}
        >
          選擇門市
        </button>
        <br />
        門市名稱: <input type="text" value={store711.storename} disabled />
        <br />
        門市地址: <input type="text" value={store711.storeaddress} disabled />
      </div>
      <hr />
      <h3>以下為測試</h3>
      <div>
        <button
          onClick={() => {
            closeWindow();
          }}
        >
          關閉跳出的7-11選擇視窗(測試用，不需要)
        </button>
      </div>
      <p>得到的物件值: {JSON.stringify(store711)}</p>
    </>
  );
}
