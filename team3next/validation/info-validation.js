import * as yup from "yup";

const phoneRegex =
  /(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}|09\d{2}(\d{6}|-\d{3}-\d{3})/;
const fileTypeArray = ["image/jpeg", "image/png", "image/webp"];
const infoSchema = yup.object().shape({
  name: yup.string().required("請填寫店家名稱"),
  city: yup.string().required("請選擇城市"),
  district: yup.string().required("請選擇鄉鎮區"),
  address: yup.string().required("請填寫完整地址"),
  phone: yup
    .string()
    .required("請輸入聯絡電話")
    .matches(phoneRegex, "請輸入正確的手機或市內電話號碼"),
  opening: yup.string(),
  description: yup
    .string()
    .required("請填寫介紹，讓其他用戶更好認識您的餐廳")
    .max(300),
  photo: yup
    .mixed()
    .test("required", "請至少上傳一張照片", (value) => {
      return value && value.length;
    })
    .test("fileSize", "請檢查您的檔案大小", (value, context) => {
      return value && value.every((file) => file.size <= 20000000);
    })
    .test("type", "請上傳支持的檔案類型", (value) => {
      return value && value.every((file) => fileTypeArray.includes(file.type));
    }),
});
// value其實相當於input file字段的filelist陣列，而value.every即可迭代出file物件使用fileTypeArray陣列includes檢查file.type是否在陣列之中，如果存在就回傳true代表檔案合法，如果不存在回傳false就代表檔案不合法
// file.size為相同原理
export default infoSchema;
