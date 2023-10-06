import * as yup from "yup"

const infoSchema= yup.object().shape({
photo:yup.mixed().required("請至少提供一張照片")
})


export default infoSchema