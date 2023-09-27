import React from 'react'

export default function LocationSelect() {
  return (
    <>
        <button
              className="btn dropdown-toggle btn-lg middle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <span className="icon-map fs-5 pe-2 fw-bold"></span>
              不分地區
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#/">
                  台北市
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#/">
                  桃園市
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#/">
                  高雄市
                </a>
              </li>
            </ul>
    </>
  )
}
