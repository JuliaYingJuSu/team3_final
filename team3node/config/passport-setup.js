import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import db from "../module/connect.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [user] = await db.query(
      "SELECT * FROM `google_members` WHERE id = ?",
      [id]
    );
    if (user.length > 0) {
      done(null, user[0]);
    }
  } catch (err) {
    console.error("Error in deserializeUser:", err);
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      let { id, displayName } = profile;
      // check if user already exists or not
      const [duplicatedCheck] = await db.query(
        "SELECT * FROM `google_members` WHERE googleId = ?",
        [id]
      );
      if (duplicatedCheck.length > 0) {
        console.log("user already is ", duplicatedCheck[0]);
        done(null, duplicatedCheck[0]);
      } else {
        // 插入新用戶
        try {
          const newUser = await db.query(
            "INSERT INTO `google_members`(`username`, `googleId`) VALUES (?,?)",
            [displayName, id]
          );
          // console.log(newUser[0]);
          // [
          //   ResultSetHeader {
          //     fieldCount: 0,
          //     affectedRows: 1,
          //     insertId: 13,
          //     info: '',
          //     serverStatus: 2,
          //     warningStatus: 0,
          //     changedRows: 0
          //   },
          //   undefined
          // ]
          // 立即查詢新用戶結果回傳給done()
          const [insertedUser] = await db.query(
            "SELECT * FROM `google_members` WHERE id = ?",
            [newUser[0].insertId]
          );
          console.log(insertedUser);
          if (insertedUser.length > 0) {
            // [ { id: 18, username: 'meko ya', googleId: '113575131434525315579' } ]
            console.log("created new user: ", insertedUser[0]);
            done(null, insertedUser[0]);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  )
);

export default passport;
// passport的google strategy 導出到index頂層給下方的authRouter使用
