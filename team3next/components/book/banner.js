import LocationSelect from "../layout/location-select";
import SearchBar from "../layout/search-bar";

export default function Banner() {
  return (
    <>
      <div className="w-100 h400 d-flex align-items-end banner pdb-50">
        <div className="container d-flex justify-content-center">
          <div className="dropdown ms-5 pe-4">
            {/* 下拉選單 */}
            <LocationSelect />
          </div>
          {/* 搜尋條 */}
          <SearchBar />
        </div>
      </div>

      <style global jsx>
        {`
          .h400 {
            height: 400px;
          }
          .banner {
            background-image: url("/images/book/banner.png");
            background-size: cover;
          }
          .pdb-50{
            padding-bottom:50px;
          }
          @media screen and (max-width: 500px) {
            .banner {
              height:50px;
              background-image:none;
            }
            .pdb-50{
              padding-bottom:5px;
            }
          }
        `}
      </style>
    </>
  );
}
