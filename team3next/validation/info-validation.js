import * as yup from "yup"

const phoneRegex = /(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}/;
const infoSchema= yup.object().shape({
    name:yup.string().required("請填寫店家名稱"),
    city:yup.string().required("請選擇城市"),
    district:yup.string().required("請選擇鄉鎮區"),
    address:yup.string().required("請填寫完整地址"),
    phone:yup.string().required("請輸入市內電話").matches(phoneRegex,"請輸入正確的市話格式"),
    photo: yup.mixed()
      .test('required', "You need to provide a file", (value) =>{
        return value && value.length
      } )
      .test("fileSize", "The file is too large", (value, context) => {
        return value && value[0] && value[0].size <= 200000;
      })
      .test("type", "We only support jpeg", function (value) {
        return value && value[0] && value[0].type === "image/jpeg";
      }),
  });


export default infoSchema