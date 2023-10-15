import React from "react";

export default function SearchBar(
  {
    searchKeyword, 
    setSearchKeyword
  }
) {
  const handleSearch = (e) => {
    setDisplayData(e.target.innerText);
  };

  return (
    <>
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <input
          className="form-control me-2 searchbar ps-4"
          type="search"
          placeholder="輸入「早午餐」或「甜點」找尋美食!"
          aria-label="Search" value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}></input>
        <span className="icon-search search-banner"></span>
      </form>

      <style jsx>
        {`
          .searchbar {
            width: 655px;
            height: 60px;
            border-radius: 40px;
          }
          .search-banner {
            position: relative;
            font-size: 24px;
          }
          .search-banner:before {
            position: absolute;
            right: 25px;
            top: 18px;
          }
          @media screen and (max-width: 500px) {
            .searchbar {
              display: flex;
              width: 360px;
              height: 40px;
              padding: 0px 5px;
              flex-direction: column;
              align-items: center;
              gap: 8px;
            }
            .search-banner:before {
              position: absolute;
              right: 25px;
              top: 9px;
            }
          }
        `}
      </style>
    </>
  );
}
