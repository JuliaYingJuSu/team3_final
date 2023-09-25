import React from "react";

export default function UserButtonGroup() {
  return (
    <>
      <div className="mb-3">
        <input name="id" type="hidden" />
        <div className="d-flex">
          <span className="fw-bold">喜愛的食物種類</span>
          <div>
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-1"
              name="likefoodtag[]"
              value="1"
            />
            <label
              className="btn btn-outline ms-2 rounded rounded-4 fw-bold"
              for="btn-check-1">
              台式
            </label>
            <br />
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-2"
              name="likefoodtag[]"
              value="2"
            />
            <label
              className="btn btn-outline-warning ms-2 rounded rounded-4 fw-bold"
              for="btn-check-2">
              中式
            </label>
            <br />
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-3"
              name="likefoodtag[]"
              value="3"
            />
            <label
              className="btn btn-outline-warning ms-2 rounded rounded-4 fw-bold"
              for="btn-check-3">
              日式
            </label>
            <br />
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-4"
              name="likefoodtag[]"
              value="4"
            />
            <label
              className="btn btn-outline-warning ms-2 rounded rounded-4 fw-bold"
              for="btn-check-4">
              韓式
            </label>
            <br />
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-5"
              name="likefoodtag[]"
              value="5"
            />
            <label
              className="btn btn-outline-warning ms-2 rounded rounded-4 fw-bold"
              for="btn-check-5">
              港式
            </label>
            <br />
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-6"
              name="likefoodtag[]"
              value="6"
            />
            <label
              className="btn btn-outline-warning ms-2 rounded rounded-4 fw-bold"
              for="btn-check-6">
              美式
            </label>
            <br />
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-7"
              name="likefoodtag[]"
              value="7"
            />
            <label
              className="btn btn-outline-warning ms-2 rounded rounded-4 fw-bold"
              for="btn-check-7">
              義式
            </label>
            <br />
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-8"
              name="likefoodtag[]"
              value="8"
            />
            <label
              className="btn btn-outline-warning ms-2 rounded rounded-4 fw-bold"
              for="btn-check-8">
              法式
            </label>
            <br />
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-9"
              name="likefoodtag[]"
              value="9"
            />
            <label
              className="btn btn-outline-warning ms-2 rounded rounded-4 fw-bold"
              for="btn-check-9">
              西式
            </label>
            <br />
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-10"
              name="likefoodtag[]"
              value="10"
            />
            <label
              className="btn btn-outline-warning ms-2 rounded rounded-4 fw-bold"
              for="btn-check-10">
              泰式
            </label>
            <br />
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-11"
              name="likefoodtag[]"
              value="11"
            />
            <label
              className="btn btn-outline-warning ms-2 rounded rounded-4 fw-bold"
              for="btn-check-11">
              越式
            </label>
            <br />
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-12"
              name="likefoodtag[]"
              value="12"
            />
            <label
              className="btn btn-outline-danger ms-2 rounded rounded-4 fw-bold"
              for="btn-check-12">
              火鍋
            </label>
            <br />
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-13"
              name="likefoodtag[]"
              value="13"
            />
            <label
              className="btn btn-outline-danger ms-2 rounded rounded-4 fw-bold"
              for="btn-check-13">
              燒烤
            </label>
            <br />
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-14"
              name="likefoodtag[]"
              value="14"
            />
            <label
              className="btn btn-outline-danger ms-2 rounded rounded-4 fw-bold"
              for="btn-check-14">
              牛排
            </label>
            <br />
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-15"
              name="likefoodtag[]"
              value="15"
            />
            <label
              className="btn btn-outline-danger ms-2 rounded rounded-4 fw-bold"
              for="btn-check-15">
              熱炒
            </label>
            <br />
          </div>
        </div>
        <div className="d-flex mt-2" style={{ marginLeft: 136 }}>
          <input
            type="checkbox"
            className="btn-check"
            id="btn-check-16"
            name="likefoodtag[]"
            value="16"
          />
          <label
            className="btn btn-outline-success ms-2 rounded rounded-4 fw-bold"
            for="btn-check-16">
            素食
          </label>
          <br />
          <input
            type="checkbox"
            className="btn-check"
            id="btn-check-17"
            name="likefoodtag[]"
            value="17"
          />
          <label
            className="btn btn-outline-info ms-2 rounded rounded-4 fw-bold"
            for="btn-check-17">
            飲品
          </label>
          <br />
          <input
            type="checkbox"
            className="btn-check"
            id="btn-check-18"
            name="likefoodtag[]"
            value="18"
          />
          <label
            className="btn btn-outline-info ms-2 rounded rounded-4 fw-bold"
            for="btn-check-18">
            酒吧
          </label>
          <br />
          <input
            type="checkbox"
            className="btn-check"
            id="btn-check-19"
            name="likefoodtag[]"
            value="19"
          />
          <label
            className="btn btn-outline-info ms-2 rounded rounded-4 fw-bold"
            for="btn-check-19">
            果汁
          </label>
          <br />
          <input
            type="checkbox"
            className="btn-check"
            id="btn-check-20"
            name="likefoodtag[]"
            value="20"
          />
          <label
            className="btn btn-outline-secondary ms-2 rounded rounded-4 fw-bold"
            for="btn-check-20">
            咖啡
          </label>
          <br />
          <input
            type="checkbox"
            className="btn-check"
            id="btn-check-21"
            name="likefoodtag[]"
            value="21"
          />
          <label
            className="btn btn-outline-info ms-2 rounded rounded-4 fw-bold"
            for="btn-check-21">
            茶
          </label>
          <br />
          <input
            type="checkbox"
            className="btn-check"
            id="btn-check-22"
            name="likefoodtag[]"
            value="22"
          />
          <label
            className="btn btn-outline-danger ms-2 rounded rounded-4 fw-bold"
            for="btn-check-22">
            炸物
          </label>
          <br />
          <input
            type="checkbox"
            className="btn-check"
            id="btn-check-23"
            name="likefoodtag[]"
            value="23"
          />
          <label
            className="btn btn-outline-dark ms-2 rounded rounded-4 fw-bold"
            for="btn-check-23">
            吃到飽
          </label>
          <br />
          <input
            type="checkbox"
            className="btn-check"
            id="btn-check-24"
            name="likefoodtag[]"
            value="24"
          />
          <label
            className="btn btn-outline-info ms-2 rounded rounded-4 fw-bold"
            for="btn-check-24">
            小吃
          </label>
          <br />
          <input
            type="checkbox"
            className="btn-check"
            id="btn-check-25"
            name="likefoodtag[]"
            value="25"
          />
          <label
            className="btn btn-outline-info ms-2 rounded rounded-4 fw-bold"
            for="btn-check-25">
            甜點
          </label>
          <br />
          <input
            type="checkbox"
            className="btn-check"
            id="btn-check-26"
            name="likefoodtag[]"
            value="26"
          />
          <label
            className="btn btn-outline-info ms-2 rounded rounded-4 fw-bold"
            for="btn-check-26">
            冰品
          </label>
          <br />
          <input
            type="checkbox"
            className="btn-check"
            id="btn-check-27"
            name="likefoodtag[]"
            value="27"
          />
          <label
            className="btn btn-outline-secondary ms-2 rounded rounded-4 fw-bold"
            for="btn-check-27">
            麵食
          </label>
          <br />
          <input
            type="checkbox"
            className="btn-check"
            id="btn-check-28"
            name="likefoodtag[]"
            value="28"
          />
          <label
            className="btn btn-outline-success ms-2 rounded rounded-4 fw-bold"
            for="btn-check-28">
            壽司
          </label>
          <br />
          <input
            type="checkbox"
            className="btn-check"
            id="btn-check-29"
            name="likefoodtag[]"
            value="29"
          />
          <label
            className="btn btn-outline-danger ms-2 rounded rounded-4 fw-bold"
            for="btn-check-29">
            義大利麵
          </label>
          <br />
          <input
            type="checkbox"
            className="btn-check"
            id="btn-check-30"
            name="likefoodtag[]"
            value="30"
          />
          <label
            className="btn btn-outline-primary ms-2 rounded rounded-4 fw-bold"
            for="btn-check-30">
            海鮮
          </label>
          <br />
        </div>
      </div>
    </>
  );
}
