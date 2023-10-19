import React from 'react'
// import styles from '@/components/cart/loading-linepay.module.css'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";


export default function loadingLinepay() {
  return (
    <>
    <SkeletonTheme baseColor={"#2a9d8f"}>
 
 <div className='all'>

 <Skeleton width='100%' height='100%' count={20} />
      <div className="progress">
  <div className="color">hhhhhh
  </div>
</div>  
  </div>
<style jsx>{`
        {/* .all {
            display: block;

    background-color: #2a9d8f;
    transform: translate(0%, 0%);
} */}


.all{
    position: relative;
    background-color: #2a9d8f;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 45%;
}
.progress{
    position: relative;
    height: 10px;
    width: 20%;
    border: 10px solid #f4a261;
    border-radius: 15px;
}
{/* .progress {
    position: relative;
    height: 10px;
    width: 20%;
    border: 10px solid #f4a261;
    border-radius: 15px;
    top: 50%
} */}

{/* .progress .color {
    position: relative;
    background-color: #ffffff;
    width: 0%;
    height: 10px;
    border-radius: 15px;
    animation: progres 6s infinite linear;
    top: 50%
} */}

.progress .color{
    position: relative;
    background-color: #ffffff;
    width: 7px;
    height: 10px;
    border-radius: 15px;
    animation: progres 4s infinite linear; 
    z-index: 1;   
}

@keyframes progres {
    0% {
        width: 0%;
    }

    25% {
        width: 50%;
    }

    50% {
        width: 75%;
    }

    75% {
        width: 85%;
    }

    100% {
        width: 100%;
    }
}
      `}</style>
      </SkeletonTheme>
    </>
  )
}
