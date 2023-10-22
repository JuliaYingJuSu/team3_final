// import express from "express";
// import passport from "passport";
// import jwt from "jsonwebtoken";

// const router = express.Router();

// router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
// // google auth passport.authenticate像是中間件觸發驗證轉跳

// router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
//   // const id = req.user.googleid;
//   // const token = jwt.sign({ id }, process.env.JWT_SECRET, {
//   //   expiresIn: 86400,
//   // });
//   // res.json({
//   //   auth: true,
//   //   result: token,
//   // });
//   res.json(req.user);
// });
// // 處理google的回傳

// router.get("/google-member", passport.authenticate("google"), (req, res) => {
//   res.json(req.user);
// });

// router.get("/logout", (req, res) => {});

// export default router;
