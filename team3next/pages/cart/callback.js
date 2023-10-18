import { useShip711StoreCallback } from '@/hooks/use-ship-711-store'

export default function Callback() {
  // 呼叫回送到母視窗用的勾子函式
  useShip711StoreCallback()

  return (
    <>
      {/* 以下可寫可不寫，非必要 */}
      <div class="d-flex justify-content-center">
        <div class="d-flex flex-column">
          <h3 class="text-center">將自動關閉視窗</h3>
          <h3 class="text-center">如無法自動關閉此視窗請按以下按鈕</h3>
          <p class="text-center">
            <button
              onClick={() => {
                window.close()
              }}
            >
              關閉視窗
            </button>
          </p>
        </div>
      </div>
    </>
  )
}

// 去除上下選單的版型，套用layout用
Callback.getLayout = function (page) {
  return (
    <main className="flex-shrink-0 mt-3">
      <div className="container-fluid m-0 p-0">{page}</div>
    </main>
  )
}
