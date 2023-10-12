import express from "express";
import db from "../module/connect.js";
import upload from "../module/upload-imgs.js";
import bcrypt from "bcryptjs";

const restaurantRouter = express.Router();

restaurantRouter.post(
  "/member-register",
  upload.array("photo"),
  async (req, res) => {
    console.log(req.body)
    const saltrounds = 10

    let { email, password, name, address, city, district, description, phone } =
      req.body;
    const output = {
      success: false,
      errors: {},
      result: {},
      postData: {}, // 除錯檢查用
    };

    
    try {
      const hash = await bcrypt.hash(password, saltRounds);
    } catch (err) {
      console.error("密码哈希化错误:", err);
      // 在这里处理错误
    }
    //異步的hash

    const sql =
      "INSERT INTO `restaurant_user`(`restaurant_name`, `restaurant_password_hash`, `restaurant_email`, `restaurant_phone`, `restaurant_city`, `restaurant_district`, `restaurant_address`, `restaurant_info`) VALUES (?,?,?,?,?,?,?,?)";

    let result;

    try {
      [result] = await db.query(sql, [
        name,
        hash,
        email,
        phone,
        city,
        district,
        address,
        description,
      ]);
      output.success = !!result.affectedRows;
      output.result = result;

      // 自增ID
      const restaurantId = result.insertId;

      const files = req.files;
      console.log(req.files);
      if (files && files.length > 0) {
        files.forEach(async (file) => {
          const { filename } = file;

          const sql2 =
            "INSERT INTO `r_img` (`restaurant_id`, `r_img_route`, `r_img_isValid`) VALUES (?, ?, ?)";

          try {
            [result] = await db.query(sql2, [restaurantId, filename, 1]);
            console.log(`File ${filename} inserted into database.`);
          } catch (err) {
            console.error(
              `Error inserting file ${filename} into database: ${err}`
            );
          }
        });
      }
    } catch (err) {
      output.errors = "SQL 錯誤";
      output.err = err;
    }

    res.json(output);
  }
);

// restaurantRouter.post("/image-upload",upload.single("image"),async (req,res) =>{
//   console.log(req.file)
// })

restaurantRouter.post( "/member-login",async (req,res)=>{
let {email,password} = req.body
const sql = 'SELECT * FROM `restaurant_user` WHERE restaurant_email = ?';
const [rows] = await db.query(sql,[email])
if(rows.length > 0){
const storedHash = rows[0].restaurant_password_hash
const isPasswordCorrect = bcrypt.compare(password,storedHash)
return isPasswordCorrect}
if(isPasswordCorrect){
  const id = rows[0].id
  const token = jwt.sign()
}})

export default restaurantRouter;
