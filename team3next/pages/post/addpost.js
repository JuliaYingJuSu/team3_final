import Navbar from "@/components/layout/default-layout/navbar-main";
import Footer from "@/components/layout/default-layout/footer";
import UserInfo from "@/components/user/user-info";
import UserNavbar from "@/components/user/user-navbar";
import Link from "next/link";

export default function Addpost() {
  return (
    <>
      <Navbar />
      <UserInfo />
      <UserNavbar />
      <div className="container d-flex justify-content-center mb-2">
        <div className="row align-items-center">
          <div className="col">
            <div className="card">
              <div className="card-body">
                {/* <h5 className="card-title">發表文章</h5> */}
                <form noValidate>
                  <div className="mb-3">
                    <div className="my-3">
                      <img
                        src="/images/post/image-gallery.png"
                        alt=""
                        className="object-fit-cover"
                      />
                    </div>
                    <input
                      type="file"
                      className="form-control"
                      id="postimages"
                      placeholder="新增照片"
                      name="post_image"
                      multiple
                    />
                    {/* <label className="input-group-text" htmlFor="postimages">
                    上傳圖片
                    </label> */}
                  </div>
                  <div className="mb-3 input-group">
                    {/* <label htmlFor="posttitle" className="form-label">
                    新增文章標題
                  </label> */}
                    <span
                      className="input-group-text icon-edit"
                      id="basic-addon1"
                    ></span>
                    <input
                      type="text"
                      className="form-control"
                      id="posttitle"
                      placeholder="新增文章標題"
                      name="post_title"
                    />
                    <div className="form-text"></div>
                  </div>
                  <div className="input-group mb-3">
                    {/* <label htmlFor="location" className="form-label">
                    新增地點
                  </label> */}
                    <span className="input-group-text icon-map"></span>
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      placeholder="新增地點"
                      name="post_restaurant_id"
                    />
                  </div>
                  <div className="input-group mb-3">
                    {/* <label htmlFor="foodtag" className="form-label">
                    新增標籤
                  </label> */}
                    <span className="input-group-text icon-tag"></span>
                    <input
                      type="text"
                      className="form-control"
                      id="foodtag"
                      placeholder="新增標籤"
                      name="food_tag_id"
                    />
                  </div>
                  <div className="input-group mb-3">
                    {/* <label htmlFor="post_content" className="form-label">
                    撰寫內文
                  </label> */}
                    <span className="input-group-text icon-edit"></span>
                    <textarea
                      type="textarea"
                      className="form-control"
                      id="post_content"
                      placeholder="撰寫內文..."
                      rows="10"
                      name="post_content"
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    <Link className="btn btn-big me-2" href="#">
                      放棄發表
                    </Link>
                    <button type="submit" className="btn btn-big ">
                      發表文章
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style jsx>
        {`
          .btn {
            color: #ae4818;
          }
          .object-fit-cover {
            width: 300px;
            height: 300px;
          }
          .bg-color {
            background-color: #fbf9ef;
            border-radius: 10px;
            width: 850px;
            height: 550px;
          }
        `}
      </style>
    </>
  );
}
