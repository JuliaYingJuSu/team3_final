import multer from "multer";

import { v4 as uuidv4 } from "uuid";

//篩選檔案和決定副檔名
const extMap = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
};

const fileFilter = (req, file, callback) => {
    callback(null, !!extMap[file.mimetype]);
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/img")
    },
    filename: (req, file, callback) => {//傳,呼叫,接收
        const f = uuidv4() + extMap[file.mimetype];
        callback(null, f);
    }
})

const upload = multer({ fileFilter, storage })

export default upload;