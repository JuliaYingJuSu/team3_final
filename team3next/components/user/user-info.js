import Link from "next/link";
import AuthContext from "@/hooks/AuthContext";
import { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function UserInfo() {
  const { auth } = useContext(AuthContext);
  const [follown, setFollowN] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgServerUrl, setImgServerUrl] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);

  // sweetalert設定
  const swalTest1 = Swal.mixin({
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
    didOpen: (swalTest1) => {
      swalTest1.addEventListener("mouseenter", Swal.stopTimer);
      swalTest1.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    fetch(process.env.API_SERVER + `/api/user/${auth.user_id}/follown`)
      .then((r) => r.json())
      .then((r) => {
        setFollowN(r);
        console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [auth.user_id]);

  const [userinfo, setUserInfo] = useState({});

  useEffect(() => {
    fetch(process.env.API_SERVER + `/api/user/${auth.user_id}/user`)
      .then((r) => r.json())
      .then((r) => {
        setUserInfo(r);
        console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [auth.user_id]);

  useEffect(() => {
    if (selectedFile) {
      const newFilename = `${auth.user_id}_${Date.now()}_${selectedFile.name}`;
      handleSubmission(newFilename);
    }
  }, [selectedFile]);

  const changeHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("File selected:", file);
      setSelectedFile(file);
      setImgServerUrl(""); // 清除先前的服务器 URL
      // setIsFilePicked(true);
      // handleSubmission();

      const newFilename = `${auth.user_id}_${Date.now()}_${file.name}`;
      handleSubmission(newFilename);
    }
  };

  const handleSubmission = async (newFilename) => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      const formData = new FormData();
      formData.append("user_id", auth.user_id);
      formData.append("user_img", selectedFile);
      formData.append("new_filename", newFilename); // 传递新的文件名

      try {
        const response = await fetch(
          process.env.API_SERVER + "/api/user/update-img",
          {
            method: "PUT",
            body: formData,
          }
        );
        if (response.ok) {
          const result = await response.json();
          console.log("成功:", result);
          setImgServerUrl(result.imgServerUrl);

          // 更新使用者資訊
          const userResponse = await fetch(
            process.env.API_SERVER + `/api/user/${auth.user_id}/user`
          );
          if (userResponse.ok) {
            const userResult = await userResponse.json();
            setUserInfo(userResult);
          } else {
            console.error("無法獲取更新的用戶資訊");
          }

          // 设置 isFilePicked 为 true，表示已成功上传
          setIsFilePicked(true);
          swalTest1.fire({
            title: "更改大頭照成功",
            icon: "success",
          });
        } else {
          console.error("失敗:", response.statusText);
        }
      } catch (error) {
        console.error("錯誤:", error);
      }
    }
  };
  return (
    <>
      <main
        className="container bottom-line"
        style={{ paddingBottom: 40, marginTop: 250 }}>
        <div
          className="d-flex justify-content-around align-items-center mt-3 mb-1"
          style={{ paddingInline: 200 }}>
          <div className="middle flex-column ms-5 ps-5">
            <h2 className="fw-bold">{auth.nickname}</h2>
            <div className="mt-2 fw-semibold">
              <span>{follown.length} 人</span>
              <span>追蹤中</span>
            </div>
            <Link className="btn btn-middle mt-4 fw-bold" href="/post/add-post">
              發表文章
            </Link>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newFilename = `${auth.user_id}_${Date.now()}_${
                selectedFile.name
              }`;
              handleSubmission(newFilename);
            }}
            encType="multipart/form-data">
            <input name="user_id" type="hidden" value={auth.user_id} />
            <div className="middle ms-5">
              <div className="position-relative">
                {userinfo && userinfo.length > 0 && userinfo[0].user_img ? (
                  <img
                    src={
                      process.env.API_SERVER + `/img/${userinfo[0].user_img}`
                    }
                    alt="大頭照"
                    className="rounded-circle headshot-big img-thumbnail"
                  />
                ) : (
                  <img
                    src="/images/logo.png"
                    alt="大頭照"
                    className="rounded-circle headshot-big img-thumbnail"
                  />
                )}
                {/* <img
                  src={
                    imgServerUrl ||
                    (userinfo.user_img
                      ? `${process.env.API_SERVER}/img/${userinfo[0].user_img}}`
                      : "/images/logo.png")
                  }
                  alt="大頭照"
                  className="rounded-circle headshot-big img-thumbnail"
                /> */}
                <label className="img-thumbnail rounded-circle position-absolute bottom-0 end-0">
                  <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={changeHandler}
                    accept="image/*"
                  />
                  <span className="fs-3 icon-pan"></span>
                </label>
              </div>
            </div>
          </form>
          <div className="d-flex ps-4 fs-5" style={{ width: 300 }}>
            {auth.self_intr}
          </div>
        </div>
      </main>
    </>
  );
}
