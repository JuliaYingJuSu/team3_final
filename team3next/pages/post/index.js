import React from "react";
import Navbar from "@/components/layout/default-layout/navbar-main";
import Breadcrumb from "@/components/post/breadcrumb";
import Banner from "@/components/post/banner";
import Footer from "@/components/layout/default-layout/footer";
import Articles from "@/components/post/articles";


export default function index() {
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
      <div className="container">
        <Breadcrumb />
      </div>
      <Banner />
      <Articles />
      <Footer />
    </>
  );
}
