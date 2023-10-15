import http from "node:http";

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    //出現的代碼
    "Content-Type": "text/html; charset=utf-8", //寫入的類型
  });
  response.end(`<h3>歡迎您好</h3> <p>${request.url}</p>`); //實際看到的畫面
});

server.listen(3000);
