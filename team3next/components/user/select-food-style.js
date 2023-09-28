import React from "react";

export default function SelectFoodStyle() {
  
  return (
    <>
      <div className="middle sfsbc">
        <h4>請先選擇您喜愛的食物樣式(可多選)</h4>
        <div className="ficb">
          <div className="middle">
            <div className="c-card middle">
              <div className="mt-2">
                <div class="custom-control custom-checkbox image-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="ck1a"
                  />
                  <label class="custom-control-label" for="ck1a">
                    <img
                      src="/images/food-1106513_1920.jpg"
                      alt="台式"
                      className="w-100 c-card-img image-checkbox"></img>
                  </label>
                </div>
                <div>
                  <span className="c-card-text fs18b pb-4">台式</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .sfsbc {
          display: flex;
          padding: 10px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          background: linear-gradient(
            146deg,
            rgba(249, 231, 166, 0.8) 16.14%,
            #fff 92.53%
          );
        }
        .ficb {
          display: flex;
          padding: 0px 10px;
          justify-content: center;
          align-items: center;
          align-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }
        .c-card-img {
          width: 164px;
          height: 164px;
          border-radius: 164px;
          object-fit: cover;
        }
        .c-card {
          height: 220px;
          width: 170px;
          flex-direction: column;
          gap: 10px;
        }
        .c-card-text {
          display: flex;
          width: 43px;
          height: 49px;
          flex-direction: column;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
