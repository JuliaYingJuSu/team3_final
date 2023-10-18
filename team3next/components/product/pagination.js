import React from "react";

export default function Pagination({
  totalItems,
  itemsPerPage,
  setCurrentPage,
  currentPage,
  dataRows,
}) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      <div className="pagination">
        {dataRows?.length ? (
          <button
            className="btn-page"
            onClick={() =>
              setCurrentPage((prev) => {
                if (prev === 1) return prev;
                return prev - 1;
              })
            }
          >
            {"<"}
          </button>
        ) : (
          ""
        )}

        {pages.map((v, i) => {
          return (
            <button
              className={
                currentPage === v ? " active btn-page" : " btn btn-page"
              }
              key={i}
              onClick={() => {
                setCurrentPage(v);
              }}
            >
              {v}
            </button>
          );
        })}

        {dataRows?.length ? (
          <button
            onClick={() =>
              setCurrentPage((prev) => {
                if (prev === pages.length) return prev;
                return prev + 1;
              })
            }
            className=" btn-page"
          >
            {">"}
          </button>
        ) : (
          ""
        )}
      </div>
      <style jsx>{`
        .pagination {
          margin: 0 auto;
          width: auto;
        }
        .btn-page {
          margin: 0 5px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          color: #ae4818;
          font-size: 18px;
          background: white;
          font-weight: bold;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-page:hover {
          background: #ae4818;
          color: white;
        }
        .btn-page:active {
          //   border: none;
        }
      `}</style>
    </>
  );
}
