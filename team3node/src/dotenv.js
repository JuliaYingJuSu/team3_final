import "dotenv/config";

//用 dotenv 套件來載入環境變數，然後將 DB_USER 和 DB_PASS 這兩個環境變數的值輸出到控制台，以便檢查它們是否正確地從 .env 檔案中讀取並設置。
const { DB_HOST, DB_USER, DB_PASS, DB_dbname } = process.env;
console.log({ DB_HOST, DB_USER, DB_PASS, DB_dbname });
