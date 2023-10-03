import { useState } from 'react'

// chunk - 依size分成子陣列，ex. chunk([1, 2, 3, 4, 5], 2) -> [[1,2],[3,4],[5]]
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  )

export default function Calendar() {
  // const [myYear, setMyYear] = useState(2022)
  // const [myMonth, setMyMonth] = useState(2)

  // 一開始未選中日期
  const [myDate, setMyDate] = useState(0)

  // 呈現yearAndMonth
  const now = new Date()

  // 要得到今天的西元年使用Date物件的getFullYear()，要得到月份使用getMonth()(注意回傳為 0~11)
  const nowY = now.getFullYear()

  // nowM =1-12
  const nowM = now.getMonth() + 1 //注意回傳為 0~11

  // nowD
  const nowD = now.getDate() //注意回傳為 0~11

  // 呈現標題
  const weekDayList = ['日', '一', '二', '三', '四', '五', '六']

  // 本月有幾天
  // (上個月的最後一天是幾號)
  const days = new Date(nowY, nowM, 0).getDate()

  // 這個月的第一天是星期幾(0-6) (月份為0-11)
  const firstDay = new Date(nowY, nowM - 1, 1).getDay()

  //------ 以下開始產生資料陣列
  // 最前面塞入空白字串的陣列
  const emptyData = Array(firstDay).fill('')

  // 有值的陣列1 ~ days
  // 如何建立一個陣列包含1...N數字
  // https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
  const valueData = Array(days)
    .fill('')
    .map((v, i) => i + 1)

  // 合併兩陣列為一長陣列
  const allData = [...emptyData, ...valueData]
  //------ 以下準備呈現在網頁上
  const allDataChunks = chunk(allData, 7)

  return (
    <>
      <h1>日曆</h1>
      <h2 id="yearAndMonth">{`${nowY}/${nowM}/${myDate ? myDate : ''}`}</h2>
      <table border="1">
        <thead id="title">
          <tr>
            {weekDayList.map(function (v, i) {
              return <th key={i}>{v}</th>
            })}
          </tr>
        </thead>
        <tbody id="data">
          {allDataChunks.map((v, i) => {
            return (
              <tr key={i}>
                {v.map((item, idx) => (
                  <td
                    key={idx}
                    onClick={() => {
                      if (item) setMyDate(item)
                    }}
                    className={`${nowD === item ? 'today' : ''} ${
                      myDate === item ? 'chosen-date' : ''
                    }`}
                    style={{ cursor: 'pointer' }}
                    role="presentation"
                  >
                    {item}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      <style jsx>
        {`
          .today {
            background-color: gold;
          }

          .chosen-date {
            background-color: green;
          }
        `}
      </style>
    </>
  )
}
