import express from "express";
import db from "../module/connect.js";

const bookRouter = express.Router();

bookRouter.get("/", async (req, res) => {
  const sql = `SELECT * from restaurant_user`;
  const [data] = await db.query(sql);
  console.log(data);
  res.json(data);
});

export default bookRouter;
