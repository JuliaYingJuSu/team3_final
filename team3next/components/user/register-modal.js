import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Register1 from "@/components/user/register01";
import Register2 from "@/components/user/register02";
import Register from "./register";
import Modal from "bootstrap/js/dist/modal";

export default function RegisterModal() {
  const [bsElement, setBsElement] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      if (typeof window !== "undefined") {
        const el = document.querySelector("#modal1");
        const instance = Modal.getInstance(el);
        //console.log(instance);

        if (!instance) {
          // initialize modal
          const modal = new Modal(el);
          //  console.log(modal);
          setBsElement(modal);
        } else {
          setBsElement(instance);
        }
      }
    }
  }, [router.isReady]);

  const handleClose = () => {
    if (bsElement) {
      bsElement.hide();
    }
  };

  return (
    <>
      <div
        className="modal fade rounded"
        id="modal1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content position-relative">
            <span
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3 fs-5"
              aria-label="Close"
              data-bs-dismiss="modal"></span>
            <Register handleClose={handleClose} />
          </div>
        </div>
      </div>
    </>
  );
}
