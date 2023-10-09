

res.end()
res.send()
res.json()
res.render()
res.redirect()
------------------------------------

req.query   # query string
req.body    # post data (urlencoded, json)
req.file
req.files
req.params  # 路徑上的變數 (動態路由)
req.session
------------------------------------
Restful api

GET     (Read)
POST    (Create)
PUT     (Update)
DELETE  (Delete)

GET     /products       # 取得列表資料
GET     /products/:id   # 取得單項資料
POST    /products       # 新增資料
PUT     /products/:id   # 修改單項資料
DELETE  /products/:id   # 刪除單項資料
------------------------------------
URLSearchParams 的功能
  1. 解析 query string (urlencoded)
  2. 把 Object 物件轉換為 urlencoded 格式
  3. 把 FormData 物件轉換為 urlencoded 格式


