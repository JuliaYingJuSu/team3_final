import { useState } from "react";
import { chunk } from "lodash";

export default function BookCalendar({ now, onBookMonth, onBookDate }) {
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);

  const [myMonth, setMyMonth] = useState(tomorrow.getMonth() + 1);
  const [myDate, setMyDate] = useState(tomorrow.getDate());
  const weekDayList = ["日", "一", "二", "三", "四", "五", "六"];
  const days = new Date(now.y, now.m, 0).getDate();
  const Ndays = new Date(now.y, now.m + 1, 0).getDate();
  const firstDay = new Date(now.y, now.m - 1, 1).getDay();
  const NfirstDay = new Date(now.y, now.m, 1).getDay();
  const allData1 = chunk(
    [
      ...Array(firstDay).fill(""),
      ...Array(days)
        .fill("")
        .map((v, i) => i + 1),
    ],
    7
  );

  const allData2 = chunk(
    [
      ...Array(NfirstDay).fill(""),
      ...Array(Ndays)
        .fill("")
        .map((v, i) => i + 1),
    ],
    7
  );

  const isDateSelectable1 = (item) => {
    const selectedDate = new Date(now.y, now.m - 1, item);
    const todayDate = new Date(now.y, now.m - 1, now.d);
    return selectedDate > todayDate;
  };

  const isDateSelectable2 = (item) => {
    const selectedDate = new Date(now.y, now.m, item);
    const NtodayDate = new Date(now.y, now.m, now.d);
    const isFirstDayOrLater = item >= 1;
    return isFirstDayOrLater && selectedDate <= NtodayDate;
  };

  return (
    <>
      {/* <h1>日曆</h1>

      <h2 id="yearAndMonth">{`${now.y}/${myMonth ? myMonth : ""}/${
        myDate ? myDate : ""
      }`}</h2> */}
      <div className="row justify-content-around">
        <div className="col-12 col-xl-5">
          <table>
            <thead id="title1">
              <tr>
                <th colspan={7} className="t-header">
                  {`${now.y} 年 ${now.m} 月`}
                </th>
              </tr>
              <tr>
                {weekDayList.map(function (v, i) {
                  return <th key={i}>{v}</th>;
                })}
              </tr>
            </thead>
            <tbody id="data1">
              {allData1.map((v, i) => {
                return (
                  <tr key={i}>
                    {v.map((item, idx) => (
                      <td>
                        <div
                          key={idx}
                          onClick={() => {
                            if (item && isDateSelectable1(item)) {
                              setMyDate(item);
                              setMyMonth(now.m);
                              onBookDate(`${item}`);
                              onBookMonth(`${now.m}`);
                            }
                          }}
                          className={`
                          box
                          ${
                            myDate === item && myMonth === now.m
                              ? "chosen-date"
                              : ""
                          } 
                          ${
                            isDateSelectable1(item)
                              ? "selectable"
                              : "not-selectable"
                          }`}
                          role="presentation"
                        >
                          {item}
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-xl-5">
          <table>
            <thead id="title2">
              <tr>
                <th colspan={7} className="t-header">
                  {`${now.y} 年 ${now.m + 1} 月`}
                </th>
              </tr>
              <tr>
                {weekDayList.map(function (v, i) {
                  return <th key={i}>{v}</th>;
                })}
              </tr>
            </thead>
            <tbody id="data2">
              {allData2.map((v, i) => {
                return (
                  <tr key={i}>
                    {v.map((item, idx) => (
                      <td>
                        <div
                          key={idx}
                          onClick={() => {
                            if (item && isDateSelectable2(item)) {
                              setMyDate(item);
                              setMyMonth(now.m + 1);
                              onBookDate(`${item}`);
                              onBookMonth(`${now.m + 1}`);
                            }
                          }}
                          className={`
                          box
                          ${
                            myDate === item && myMonth === now.m + 1
                              ? "chosen-date"
                              : ""
                          }  
                          ${
                            isDateSelectable2(item)
                              ? "selectable"
                              : "not-selectable"
                          }`}
                          role="presentation"
                        >
                          {item}
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>
        {`
          .t-header {
            font-size: 28px;
            padding: 12px;
          }
          .chosen-date {
            color: #fff;
            background-color: #ae4818;
          }

          .selectable {
            border: 1px solid lightgrey;
            border-radius: 8px;
            cursor: pointer;
          }

          .not-selectable {
            color: lightgray;
          }

          th {
            font-weight: normal;
            text-align: center;
            padding: 15px;
          }

          .box {
            font-weight: bold;
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 15px;
            margin: 6px;
          }
        `}
      </style>
    </>
  );
}
