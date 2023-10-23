import * as yup from "yup";
const phoneRegex =
  /(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}|09\d{2}(\d{6}|-\d{3}-\d{3})/;
const passwordRegex = /^(?=.*[a-z])(?=.*\d).+$/
const fileTypeArray = ["image/jpeg", "image/png", "image/webp"];

const registerSchema = yup.object().shape({
  email: yup.string().required("請填寫email").email("請填寫正確的email格式"),
  password: yup
    .string()
    .required("請輸入密碼")
    .min(4, "最少為4位數")
    .max(10, "最多為10位數")
    .matches(passwordRegex,"至少需要一個小寫的英文字母或者數字"),
  rePassword: yup
    .string()
    .required("請再次輸入密碼")
    .oneOf([yup.ref("password"), null], "兩次輸入的密碼不相同哦"),
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
      return value && value.every((file) => file.size <= 1000000);
    })
    .test("type", "請上傳支持的檔案類型", (value) => {
      return value && value.every((file) => fileTypeArray.includes(file.type));
    }),
});

export default registerSchema;
