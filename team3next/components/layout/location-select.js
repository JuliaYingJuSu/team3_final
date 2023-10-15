import React from 'react'

export default function LocationSelect(
  {
  selectedCity,
  setSelectedCity,
}
) {
  const handleCityChange = (e) => {
    setSelectedCity(e.target.innerText);
  };
  return (
    <>
        <button
              className="btn dropdown-toggle btn-lg middle locat-b"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <span className="icon-map fs-5 pe-2 fw-bold"></span>
              {selectedCity || "不分地區"}
            </button>
            <ul className="dropdown-menu">
              <li className="dropdown-item" onClick={handleCityChange}>
              台北市
            </li>
            <li className="dropdown-item" onClick={handleCityChange}>
              新北市
            </li>
            <li className="dropdown-item" onClick={handleCityChange}>
              基隆市
            </li>
            <li className="dropdown-item" onClick={handleCityChange}>
              高雄市
            </li>
            </ul>
            <style jsx>
        {`
          @media screen and (max-width: 500px) {
            .locat-b {
              display:none;
            }
          }
        `}
      </style>
    </>
  )
}
