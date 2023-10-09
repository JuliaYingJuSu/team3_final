//引入模組
import http from "node:http";
import fs from "node:fs/promises"

//建立一個 HTTP 伺服器。當有請求進來時，伺服器會執行後面的處理程式。
const server=http.createServer(async(request,response)=>{
    await fs.writeFile("./src/headers01.txt",JSON.stringify(request.headers,null,4))

    response.writeHead(200,{//出現的代碼
        "Content-Type":"text/html; charset=utf-8" //寫入的類型
    });
    response.end(`<h3>寫入完成</h3> <p>${request.url}</p>`)//實際看到的畫面
});


server.listen(3000);