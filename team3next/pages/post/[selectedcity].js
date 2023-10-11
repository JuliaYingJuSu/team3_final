import React, { useEffect } from "react";
import Navbar from "@/components/layout/default-layout/navbar-main";
import Breadcrumb from "@/components/post/breadcrumb";
import Banner from "@/components/post/banner";
import Footer from "@/components/layout/default-layout/footer";
import Main from "@/components/post/main";


export default function postByCity() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("");
  useEffect(()=>{
    const selectedCity = router.query.selectedCity;
    console.log(selectedCity);
    fetch(process.env.API_SERVER + `/api/post/${selectedCity}`)
    .then((r)=> r.json())
    .then((r)=>{
      console.log(r);
      setData(r);
      setSelectedCity(r.selectedCity);
    });
  },[router.isReady]);
  






  return (
    <>
      <Navbar />
      <div className="container">
        <Breadcrumb />
      </div>
      <Banner />
      <Main />
      <Footer />
    </>
  )
}
