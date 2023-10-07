import * as yup from "yup";

const profileSchema = yup.object().shape({
  email: yup.string().email("不符合email格式").required("請填寫email"),
  password: yup
    .string()
    .min(4, "最少為4位數")
    .max(10, "最多為10位數")
    .required("請輸入密碼"),
  rePassword: yup
    .string()
    .min(4, "最少為4位數")
    .max(10, "最多為10位數")
    .required("請再次輸入密碼"),
});

export default profileSchema;
