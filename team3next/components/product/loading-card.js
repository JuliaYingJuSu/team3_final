import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@/pages/product/index.module.css";
import { MdOutlineImage } from "react-icons/md";

export default function LoadingCard({ cards }) {
  return Array({ cards })
    .fill(0)
    .map((items) => {
      return (
        <SkeletonTheme baseColor={"#F0E4C5"} highlightColor={"#FBF9EF"}>
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-3 d-flex justify-content-center align-items-center ">
            <div className={styles.cardP}>
              <div
                className={
                  styles.imgBox + "w-100 d-flex justify-content-center pt-1"
                }
              >
                <MdOutlineImage size={180} style={{ color: "#F0E4C5" }} />
              </div>
              <div
                className={
                  styles.contentBox +
                  " px-2 w-100 d-flex justify-content-between pt-2 pb-1 align-items-start"
                }
              >
                <span className="d-flex flex-column justify-content-center ps-4 ">
                  <Skeleton
                    width={200}
                    height={16}
                    style={{ marginBottom: "15px" }}
                  />
                  <Skeleton width={150} height={12} count={2} />
                </span>
              </div>
              <div
                style={{ color: "#666666" }}
                className={
                  styles.contentBox +
                  " px-2 w-100 d-flex justify-content-between pt-1 pb-1"
                }
              >
                <span className="icon-cark"></span>
              </div>
            </div>
          </div>
        </SkeletonTheme>
      );
    });
}
