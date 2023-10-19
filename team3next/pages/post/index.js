import { useState } from "react";
import Navbar from "@/components/layout/default-layout/navbar-main";
import Breadcrumb from "@/components/post/breadcrumb";
import Banner from "@/components/post/banner";
import Footer from "@/components/layout/default-layout/footer";
import Main from "@/components/post/main";

export default function index() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
 
  // const [data, setData] = useState([])

  // useEffect(()=>{
  //   fetch("http://localhost:3002/post/")
  // console.log("hello")
  //   .then((r)=>r.json())
  //   .then((data) => {
  //     console.log(data)
  //     setData(data)
  // })
  // },[])
  return (
    <>
      <Navbar />
      <div className="container" style={{marginTop:225}}>
        <Breadcrumb />
      </div>
      <Banner
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <Main 
      selectedCity={selectedCity} 
      selectedStyle={selectedStyle}
      searchKeyword={searchKeyword}
      />
      <Footer />
    </>
  );
}
