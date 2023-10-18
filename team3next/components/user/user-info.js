import Link from "next/link";
import AuthContext from "@/hooks/AuthContext";
import { useContext,useState,useEffect } from "react";

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

  return (
    <>
      <main className="container bottom-line" style={{ paddingBottom: 40,marginTop:250 }}>
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
          <div className="middle ms-5">
            <div className="position-relative">
              {auth.user_img ? (
                <img
                  src={auth.user_img}
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
              <label className="img-thumbnail rounded-circle position-absolute bottom-0 end-0">
                <input style={{ display: "none" }} type="file" />
                <span className="fs-3 icon-pan"></span>
              </label>
            </div>
          </div>
          <div className="d-flex ps-4 fs-5" style={{ width: 300 }}>
            {auth.self_intr}
          </div>
        </div>
      </main>
    </>
  );
}
