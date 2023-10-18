import Link from "next/link";
import AuthContext from "@/hooks/AuthContext";
import { useContext, useState, useEffect } from "react";

export default function UserInfo() {
  const { auth } = useContext(AuthContext);
  const [follown, setFollowN] = useState([]);

  useEffect(() => {
    fetch(process.env.API_SERVER + `/api/user/${auth.user_id}/follown`)
      .then((r) => r.json())
      .then((r) => {
        setFollowN(r);
        // console.log(r);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [auth.user_id]);

  //圖片上傳
  // 選擇的檔案
  const [selectedFile, setSelectedFile] = useState(null);
  // 是否有檔案被挑選
  const [isFilePicked, setIsFilePicked] = useState(false);
  // 預覽圖片
  const [preview, setPreview] = useState("");
  // server上的圖片網址
  const [imgServerUrl, setImgServerUrl] = useState("");

  // 當選擇檔案更動時建立預覽圖
  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    console.log(objectUrl);
    setPreview(objectUrl);

    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const changeHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      setIsFilePicked(true);
      setSelectedFile(file);
      setImgServerUrl("");

      // 觸發上傳
      handleSubmission(file);
    }
  };

  const handleSubmission = (file) => {
    const formData = new FormData();
    formData.append("user_id", auth.user_id);
    formData.append("user_img", file);

    // 對照server上的檔案名稱 req.files.avatar
    // formData.append("user_img", selectedFile);

    fetch(
      process.env.API_SERVER + "/api/user/update-img", //server url
      {
        method: "PUT",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setImgServerUrl(result.imgServerUrl);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
              handleSubmission();
            }}
            encType="multipart/form-data">
            <input name="user_id" type="hidden" value={auth.user_id} />
            <div className="middle ms-5">
              <div className="position-relative">
                {selectedFile ? (
                  auth.user_img ? (
                    <img
                      src={process.env.API_SERVER +`/img/${auth.user_img}`}
                      alt="大頭照"
                      className="rounded-circle headshot-big img-thumbnail"
                    />
                  ) : (
                    <img
                      src={preview}
                      alt="大頭照"
                      className="rounded-circle headshot-big img-thumbnail"
                    />
                  )
                ) : (
                  <img
                    src="/images/logo.png"
                    alt="大頭照"
                    className="rounded-circle headshot-big img-thumbnail"
                  />
                )}
                <label className="img-thumbnail rounded-circle position-absolute bottom-0 end-0">
                  <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={changeHandler}
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
