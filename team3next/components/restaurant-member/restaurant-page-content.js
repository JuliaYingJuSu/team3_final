import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import infoSchema from "@/validation/info-validation";
import { FormItem } from "react-hook-form-antd";
import CitySelector from "./form-component/city-selector";
import { useMemberAuthContext } from "./hooks/use-memberauth-context";
import axios from "axios";
import Swal from "sweetalert2";
import { PictureOutlined } from "@ant-design/icons";
import { Upload, Modal, Form } from "antd";

export default function PageContent() {
  const router = useRouter();
  const [here, setHere] = useState("Hereeeeee");
  const [refreshKey, setRefreshKey] = useState(0);
  const [fetchedData, setFetchedData] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const { memberAuth, setMemberAuth } = useMemberAuthContext();
  const fetchData = async () => {
    try {
      if (memberAuth && memberAuth.result.token) {
        const response = await axios.get(
          process.env.API_SERVER + "/api/restaurant/member-info",
          {
            headers: {
              Authorization: "Bearer " + memberAuth.result.token,
            },
          }
        );
        console.log("fetch result:", response.data);
        setFetchedData(response.data);
        setDataLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [memberAuth, refreshKey]);
  // useEffect(() => {
  //   console.log(fetchedData);
  //   if (!memberAuth.auth && dataLoaded) {
  //     alert("請先登入");
  //     router.push(`/restaurant-member/member-login`);
  //   }
  // }, [memberAuth, dataLoaded]);

  const onSubmit = async (data) => {
    // 一個formdata物件
    const formData = new FormData();

    // 將表單的name加到formdata,因為rhf的data是obj，可以這麼做
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("city", data.city);
    formData.append("district", data.district);
    formData.append("address", data.address);
    formData.append("opening", data.opening);
    formData.append("description", data.description);
    // 添加檔到 FormData，其中 "photo" 是欄位名稱
    // 拆解到只剩下file
    data.photo.forEach((file) => {
      formData.append("photo", file.originFileObj);
    });
    // console.log(data.photo[0].originFileObj);

    try {
      const response = await axios.put(
        process.env.API_SERVER + "/api/restaurant/member-page-content-update",
        formData,
        {
          headers: {
            Authorization: "Bearer " + memberAuth.result.token,
          },
        }
      );
      console.log("Server Response:", response.data);
      setRefreshKey((prevKey) => prevKey + 1);
      Swal.fire({
        icon: "success",
        title: "修改成功",
        text: "已成功修改資料",
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(infoSchema) });
  console.log(errors);

  // console.log(watch());
  // rhf

  const props = {
    name: "files",
    multiple: true,
    listType: "picture",
    maxCount: 5,
    style: {
      backgroundColor: "#FBF9EF",
      border: "none",
    },
  };
  // antd

  return (
    <>
      <Head>
        <title>食食嗑嗑-餐廳資料維護</title>
      </Head>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <h2 style={{ color: "#985637" }}>餐廳資料維護</h2>
          <Form
            className="d-flex flex-column justify-content-center"
            onFinish={handleSubmit(onSubmit)}
          >
            <div className="d-flex flex-column my-3">
              <label
                className="fs18b"
                htmlFor="name"
                onClick={() => {
                  setValue("name", "晴木千層炸雞");
                }}
              >
                商家名稱
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.name?.message}
                </span>
              </label>
              <input
                className="input-res"
                type="text"
                {...register("name")}
                id="name"
                placeholder="請輸入商家名稱"
                defaultValue={fetchedData[0]?.restaurant_name}
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label
                className="fs18b"
                htmlFor="address"
                onClick={() => {
                  setValue("address", "臺灣大道四十五段2068號");
                }}
              >
                商家地址
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.city?.message}
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.district?.message}
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.address?.message}
                </span>
              </label>
              <div className="d-flex justify-content-start">
                <CitySelector
                  register={register}
                  watch={watch}
                  fetchedData={fetchedData}
                />
                {/* 當作PageContent是父組件,將此頁引入的useform方法接著傳遞給CitySelector作為props */}
                <input
                  className="input-res w-100"
                  type="text"
                  {...register("address", { required: "請輸入資料" })}
                  id="address"
                  placeholder="請輸入資料"
                  defaultValue={fetchedData[0]?.restaurant_address}
                />
              </div>
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="phone">
                聯絡電話
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.phone?.message}
                </span>
              </label>
              <input
                className="input-res"
                type="text"
                {...register("phone", { required: "請輸入資料" })}
                id="phone"
                placeholder="請輸入聯絡電話"
                defaultValue={fetchedData[0]?.restaurant_phone}
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label
                className="fs18b"
                htmlFor="opening"
                onClick={() => {
                  setValue("opening", "週五公休");
                }}
              >
                營業時間備註
              </label>
              <input
                className="input-res"
                type="text"
                {...register("opening")}
                id="opening"
                placeholder="可以在這裡添加額外營業資訊"
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label
                className="fs18b"
                htmlFor="description"
                onClick={() => {
                  setValue(
                    "description",
                    "亞伯拉罕·林肯告訴我們，你活了多少歲不算什麽，重要的是你過多少炸雞。這讓我深深地想到，我們都知道，只要有意義，那麽就必須慎重考慮。我們一般認為，抓住了問題的關鍵，其他一切則會迎刃而解。帶著這些問題，我們來審視一下炸雞好好吃。其實炸雞好好吃是非常值得我們深思的。炸雞好好吃真的是很值得探究，一般來說，弗洛伊德曾經說過，人生就象炸雞，一步失誤，全盤皆輸，這是令人悲哀之事;而且人生還不如弈棋，不可能再來一局，也不能悔棋。我希望諸位也能好好地體會這句話。"
                  );
                }}
              >
                餐廳介紹
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.description?.message}
                </span>
              </label>
              <textarea
                className="input-area"
                type="text"
                {...register("description")}
                id="description"
                style={{ height: "150px" }}
                defaultValue={fetchedData[0]?.restaurant_info}
                placeholder="請填寫介紹，讓其他用戶更好認識您的餐廳"
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="photo">
                {" "}
                餐廳照片
                <span className="ps-1" style={{ color: "red" }}>
                  *
                </span>
                <span className="ps-1" style={{ color: "red" }}>
                  {errors.photo?.message}
                </span>
              </label>

              <FormItem
                control={control}
                name="photo"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e && e.fileList;
                }}
                noStyle
                // bug fixed用來解決filelist錯誤
              >
                <Upload.Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <PictureOutlined style={{ color: "#985637" }} />
                  </p>
                  <p className="ant-upload-text">
                    請從電腦選擇照片或拖曳到這裡
                  </p>
                  <p className="ant-upload-hint">
                    可多選，最多五張，限.jpg/.png/.webp，單張500Kb以下
                  </p>
                </Upload.Dragger>
              </FormItem>
            </div>

            <button className="btn btn-big mt-4 ms-auto" type="submit">
              確認修改
            </button>
          </Form>
        </div>
        <div className="col-3"></div>
      </div>
    </>
  );
}
