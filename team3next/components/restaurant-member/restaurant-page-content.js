import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import infoSchema from "@/validation/info-validation";
import { FormItem } from "react-hook-form-antd";
import CitySelector from "./form-component/city-selector";
import { useMemberAuthContext } from "./hooks/use-memberauth-context";
import axios from "axios";

import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Upload, Modal, Form } from "antd";

export default function PageContent() {
  const router = useRouter();
  const [here, setHere] = useState("Hereeeeee");
  const [fetchedData, setFetchedData] = useState("default");
  const [dataLoaded, setDataLoaded] = useState(false);
  const { memberAuth, setMemberAuth } = useMemberAuthContext();
  const fetchData = async () => {
    try {
      const authObj = JSON.parse(localStorage.getItem("token"));
      if (memberAuth && memberAuth.result.token) {
        const response = await axios.get(
          "http://localhost:3002/api/restaurant/member-info",
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
  }, [memberAuth]);
  useEffect(() => {
    console.log(fetchedData);
    if (!memberAuth.auth && dataLoaded) {
      alert("請先登入");
      router.push(`/restaurant-member/member-login`);
    }
  }, [memberAuth, dataLoaded]);

  const onSubmit = async (data) => {
    // 一個formdata物件
    const formData = new FormData();

    // 將表單的name加到formdata,因為rhf的data是obj，可以這麼做
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("district", data.district);
    formData.append("address", data.address);
    formData.append("opening", data.opening);
    formData.append("discription", data.discription);
    // 添加檔到 FormData，其中 "photo" 是欄位名稱
    // 拆解到只剩下file
    data.photo.forEach((file) => {
      formData.append("photo", file.originFileObj);
    });
    // console.log(data.photo[0].originFileObj);

    try {
      const response = await axios.post(
        "http://localhost:3002/member-register",
        formData,
        {
          headers: {
            Authorization: "Bearer " + memberAuth.result.token,
          },
        }
      );
      console.log("Server Response:", response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
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
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <h2 style={{ color: "#985637" }}>餐廳資料維護</h2>
          <Form
            className="d-flex flex-column justify-content-center"
            onFinish={handleSubmit(onSubmit)}
          >
            <div className="d-flex flex-column my-3">
              <label className="fs18b" htmlFor="name">
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
                placeholder=""
                defaultValue={fetchedData[0].restaurant_name}
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="address">
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
                  defaultValue={fetchedData[0].restaurant_address}
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
                defaultValue={fetchedData[0].restaurant_phone}
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label className="fs18b" htmlFor="opening">
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
              <label className="fs18b" htmlFor="description">
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
                defaultValue={fetchedData[0].restaurant_info}
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
                    <InboxOutlined style={{ color: "#ae4818" }} />
                  </p>
                  <p className="ant-upload-text">
                    請從電腦選擇照片或拖曳到這裡
                  </p>
                  <p className="ant-upload-hint">
                    可多選，最多五張,限.jpg/.png/.webp
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
