import { useState } from "react";
import { chunk } from "lodash";

export default function Calendar3() {
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);

  const [myDate, setMyDate] = useState(tomorrow.getDate());
  const now = {
    y: new Date().getFullYear(),
    m: new Date().getMonth() + 1,
    d: new Date().getDate(),
  };
  const weekDayList = ["日", "一", "二", "三", "四", "五", "六"];
  const days = new Date(now.y, now.m, 0).getDate();
  const firstDay = new Date(now.y, now.m - 1, 1).getDay();
  const allData = chunk(
    [
      ...Array(firstDay).fill(""),
      ...Array(days)
        .fill("")
        .map((v, i) => i + 1),
    ],
    7
  );

  const isDateSelectable = (item) => {
    const selectedDate = new Date(now.y, now.m - 1, item);
    const todayDate = new Date(now.y, now.m - 1, now.d);
    return selectedDate > todayDate;
  };

  return (
    <>
      <h1>日曆</h1>
      <h2 id="yearAndMonth">{`${now.y}/${now.m}/${myDate ? myDate : ""}`}</h2>
      <table border="1">
        <thead id="title">
          <tr>
            {weekDayList.map(function (v, i) {
              return <th key={i}>{v}</th>;
            })}
          </tr>
        </thead>
        <tbody id="data">
          {allData.map((v, i) => {
            return (
              <tr key={i}>
                {v.map((item, idx) => (
                  <td
                    key={idx}
                    onClick={() => {
                      if (item && isDateSelectable(item)) {
                        setMyDate(item);
                      }
                    }}
                    className={`
                    allDate
                    ${myDate === item ? "chosen-date" : ""} 
                    ${
                      isDateSelectable(item) ? "selectable" : "not-selectable"
                    }`}
                    role="presentation"
                  >
                    {item}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <style jsx>
        {`
          .chosen-date {
            background-color: orange;
          }

          .selectable {
            border: 1px solid black;
            cursor: pointer;
          }

          .not-selectable {
            color: lightgray;
          }

          th {
            text-align: center;
          }

          .allDate {
            padding: 30px;
          }
        `}
      </style>
    </>
  );
}
