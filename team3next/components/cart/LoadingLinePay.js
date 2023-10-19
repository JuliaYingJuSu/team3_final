import React from 'react'
// import styles from '@/components/cart/loading-linepay.module.css'



export default function loadingLinepay() {
  return (
    <>
        <div className='all'>

        <div className="d-flex flex-sm-row bd-highlight mb-3 justify-content-center align-items-center">
 

<img src="../images/薯哥去背.png" alt="" style={{ width: '460px', height: '335px' }} />
</div>

<div className="progress">
  <div className="color">

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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 880px;
    width: 100%;
    background-color: #ebd8a9;
    {/* transform: translate(-50%,-50%); */}
    top: 70%;
    {/* left: 45%; */}
}
.progress{
    position: relative;
    height: 35px;
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
    background-color: #ebd8a9;
    top: 5px
    width: 7px;
    height: 16px;
    border-radius: 15px;
    animation: progres 3s infinite linear; 
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
    </>
  )
}
