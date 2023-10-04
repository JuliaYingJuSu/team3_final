// 主旨: 7-11獲取指定城市ID的區域名稱

import * as request from "request";
import cheerio from "cheerio";
import areaData from "@/data/store_id.json";

// getTownName, 接收2個參數(url, cityID)
// Q: 創建新Promise的原因, 是為了把一個異步操作包裝成一個promise ex: 發送POST就是一個異步操作
// 把異步操作包裝在一Promise中, 可以更方便的使用Promise提供的.then & .catch方法
// function (err, res, body){} ---> request.post 方法的回調函數
// function(err, res, body) --> err, 代表可能的錯誤, 若有會有錯誤訊息 / res, 會是http的response訊息  / body, response主體
const getTownName = (url, cityID) => {
  return new Promise((resolve, reject) => {
    let townNameArray = [];
    request.post(
      {
        url: url,
        form: {
          commandid: "GetTown",
          cityid: cityID,
        },
      },
      function (err, res, body) {
        // 將 body 中包含的 HTML 字符串轉換為一個 Cheerio 實例
        const $ = cheerio.load(body);
        //尋找html中所有標籤為townname的
        // function(index, element){...}, 用於處理每個選擇的元素。index 是迭代的索引，element 是當前迭代的元素
        $("TownName").each(function (index, element) {
          // $(this) 表示當前選擇的元素, 的文字內容.text()
          townNameArray.push($(this).text());
        });
        resolve(townNameArray);
      }
    );
  });
};

// 該操作是從指定的 URL 中獲取指定城市 ID 的區域名稱
getTownName("http://emap.pcsc.com.tw/EMapSDK.aspx", "01").then((result) => {
  console.log(result); // 台北市全區資料
});
