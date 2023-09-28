import { useState } from 'react'

export default function Html5Form() {
  // input text
  const [inputText, setInputText] = useState('')

  // textarea
  const [textareaText, setTextareaText] = useState('')

  // 控制顯示密碼用信號狀態
  const [show, setShow] = useState(false)

  // radio group
  const foodOptions = ['三明治', '貝果', '佛卡夏']
  // food狀態只有四種情況值: '' | '三明治' | '貝果' | '佛卡夏'
  const [food, setFood] = useState('')

  // select
  const cityOptions = ['台北市', '新北市', '桃園市']
  // '' | '台北市' | '新北市' | '桃園市'
  const [city, setCity] = useState('')

  // checkbox group
  const fruitOptions = ['西瓜', '文旦']
  const [fruits, setFruits] = useState(['文旦'])

  return (
    <>
      <h1>可控表單元件</h1>
      <section id="input-text">
        <h2>文字輸入框(input-text)</h2>
        <input
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value)
          }}
        />
        <h2>密碼顯示隱藏(input-password)</h2>
        <input
          // 用show狀態(布林值)切換input的類型
          type={show ? 'text' : 'password'}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value)
          }}
        />
        {/* <button
          onClick={() => {
            setShow(!show)
          }}
        >
          {show ? '隱藏' : '顯示'}
        </button> */}
        <label>
          <input
            type="checkbox"
            checked={show}
            onChange={(e) => {
              setShow(e.target.checked)
            }}
          />
          顯示密碼
        </label>
      </section>
      <section id="textarea">
        <h2>文字輸入區域(textarea)</h2>
        <textarea
          value={textareaText}
          onChange={(e) => {
            setTextareaText(e.target.value)
          }}
        />
      </section>
      <section id="radio-group">
        <h2>選項按鈕群組(radio-group)</h2>
        {foodOptions.map((v, i) => {
          return (
            <label key={i}>
              <input
                type="radio"
                // 用目前選中的food狀態來比較，決定是否呈現選中的樣子
                checked={food === v}
                // 一樣可以使用value屬性，用e.target.value在事件觸發後得到值
                value={v}
                onChange={(e) => {
                  //  狀態中記錄的是每個選項被選中的值
                  setFood(e.target.value)
                }}
              />
              {v}
            </label>
          )
        })}
      </section>
      <section id="select">
        <h2>下拉清單(select)</h2>
        <select
          value={city}
          onChange={(e) => {
            //  狀態中記錄的是每個選項被選中的值
            setCity(e.target.value)
          }}
        >
          {/* 初次呈現的預設選項，對應city狀態中的初始值(空白字串) */}
          <option value="">請選擇城市</option>
          {cityOptions.map((v, i) => {
            return (
              <option key={i} value={v}>
                {v}
              </option>
            )
          })}
        </select>
      </section>
      <section id="checkbox group">
        <h2>核取方塊群組(checkbox group)</h2>
        {fruitOptions.map((v, i) => {
          return (
            <label key={i}>
              <input
                type="checkbox"
                checked={fruits.includes(v)}
                value={v}
                onChange={(e) => {
                  const targetValue = e.target.value

                  // 判斷是否有在fruits陣列中
                  if (fruits.includes(targetValue)) {
                    // 如果有->移出陣列
                    //1 2
                    const newFruits = fruits.filter((v2) => v2 !== targetValue)
                    // 3
                    setFruits(newFruits)
                  } else {
                    // 否則->加入陣列
                    // 1 2 3
                    setFruits([...fruits, targetValue])
                  }
                }}
              />
              {v}
            </label>
          )
        })}
      </section>
    </>
  )
}