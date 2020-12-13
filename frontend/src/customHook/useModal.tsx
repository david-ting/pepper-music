import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const useModal = (): {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  modalJSX: JSX.Element;
} => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const modalJSX = (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <p>You are not logged in.</p>
          <p>
            Please click the login button.{" "}
            <Button
              variant="danger"
              className="ml-2"
              onClick={() => {
                window.location.href = `${REACT_APP_BACKEND_URL}/api/login`;
              }}
            >
              Login
            </Button>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );

  return { setShow, modalJSX };
};

export default useModal;
