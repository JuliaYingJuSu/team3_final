import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().required("請填寫email").email("請填寫正確的email格式"),
  password: yup
    .string()
    .required("請輸入密碼")
    .min(4, "最少為4位數")
    .max(10, "最多為10位數"),
});

export default loginSchema;
