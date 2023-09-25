import { useState } from "react";

export default function RegisterForm() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: "",
  });

  // 初始錯誤訊息物件
  const originErrors = {
    fullname: "",
    email: "",
    password: "",
    password2: "",
  };

  const [errors, setErrors] = useState(originErrors);

  const handleFieldChange = (e) => {
    // [e.target.name]: e.target.value
    // ^^^^^^^^^^^^^^^ 計算得來(計算出的)屬性名稱(computed property names)
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E5%90%8D
    // 1 2
    const newUser = { ...user, [e.target.name]: e.target.value };
    //3
    console.log([e.target.name]);
    setUser(newUser);
  };

  const handleSubmit = (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault();

    // 這裡可以作表單檢查
    // 信號/旗標
    let hasErrors = false;
    // 準備要放入錯誤訊息用的物件
    const newErrors = { ...originErrors };

    // if (user.fullname === '') {
    // if (user.fullname.length === 0) {
    if (!user.fullname) {
      hasErrors = true;
      newErrors.fullname = "請填寫姓名";
    }

    if (user.email === "") {
      hasErrors = true;
      newErrors.email = "請填寫Email";
    }

    if (hasErrors) {
      setErrors(newErrors);
      return; // 中止函式跳出
    }

    // 如果檢查都通過，送到伺服器(ajax, fetch...)
    alert("通過驗証，送到伺服器");
  };

  return (
    <>
      <h1>會員註冊表單</h1>
      <form onSubmit={handleSubmit}>
        <label>
          姓名
          <input
            type="text"
            name="fullname"
            value={user.fullname}
            onChange={handleFieldChange}
          />
        </label>
        <span>{errors.fullname}</span>
        <br />
        <label>
          Email
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleFieldChange}
          />
        </label>
        <span>{errors.email}</span>
        <br />
        <label>
          密碼
          <input
            type="text"
            name="password"
            value={user.password}
            onChange={handleFieldChange}
          />
          <button type="button">呈現</button>
        </label>
        <br />
        <label>
          確認密碼
          <input
            type="text"
            name="password2"
            value={user.password2}
            onChange={handleFieldChange}
          />
        </label>
        <br />
        <button type="submit">送出</button>
      </form>
    </>
  );
}
