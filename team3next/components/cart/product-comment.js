import { method } from "lodash";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ProductComment({ product }) {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");
  console.log(content);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const comment = (product) => {
    console.log(product.orderproduct_id);
    console.log(content);

    fetch("http://localhost:3002/api/product/add-comment", {
      method: "POST",
      body: JSON.stringify({
        uid: localStorage.getItem("auth").user_id,
        opid: product.orderproduct_id,
        content: content,
        // score
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
      });
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="btn-middle">
        評論
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        // style={{ backgroundColor: "#FBF9EF" }}
      >
        <Modal.Header
          closeButton
          className="pb-2"
          style={{
            backgroundColor: "#FBF9EF",
            border: "none",
          }}
        >
          <Modal.Title
            className="fs-5 pb-1"
            style={{ borderBottom: "2px solid rgba(102, 102, 102, 0.5)" }}
          >
            {product.product_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="pt-0"
          style={{
            backgroundColor: "#FBF9EF",
            // height: "250px",
          }}
        >
          <div className="rate py-2 fs-5">
            <span className="icon-Star"></span>
            <span className="icon-Star"></span>
            <span className="icon-Star"></span>
            <span className="icon-Star"></span>
            <span className="icon-Star"></span>
          </div>
          <div class="mb-3">
            <textarea
              type="text"
              class="form-control"
              name=""
              id=""
              aria-describedby="helpId"
              placeholder="評論內容..."
              className="w-100 p-1 rounded-3"
              value={content}
              onChange={(e) => {
                console.log(e.target.value);

                setContent(e.target.value);
                console.log(e.target.value);
              }}
              style={{
                fontSize: "16px",
                height: "200px",
                border: "2px solid rgba(102, 102, 102, 0.2)",
                backgroundColor: "#FBF9EF",
              }}
            />
            {/* <small id="helpId" class="form-text text-muted">
              Help text
            </small> */}
          </div>{" "}
        </Modal.Body>
        <Modal.Footer
          style={{
            border: "none",
            backgroundColor: "#FBF9EF",
          }}
        >
          <Button
            className="btn-middle"
            onClick={() => {
              console.log(product);

              comment(product);
            }}
          >
            確定
          </Button>
          <Button
            className="btn-middle"
            style={{
              backgroundColor: "#869AAA",
              border: "#869AAA",
              color: "#FFF",
            }}
            onClick={handleClose}
          >
            取消
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
