import * as yup from "yup";
const passwordRegex = /^(?=.*[a-z])(?=.*\d).+$/
const profileSchema = yup.object().shape({
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
});

export default profileSchema;
