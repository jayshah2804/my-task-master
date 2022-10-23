import React, { useRef, useState } from "react";
import "./Modal.css";

const Modal = ({
  newFileCreateHandler,
  typeClickhandler,
  error,
  modalType,
  setIsModalShown,
  setShow,
}) => {
  const fileNameRef = useRef();
  const [fileType, setFileType] = useState("File");
  return (
    <div className="main-container">
      <div className="modal-container">
        <div
          className="close"
          onClick={() => {
            setIsModalShown(false);
            setShow(false);
          }}
        >
          X
        </div>
        <header>{modalType}</header>
        {modalType === "create" && (
          <div
            onClick={(e) => {
              setFileType(e.target.innerText);
              typeClickhandler(e.target.innerText);
              document.getElementById("1").classList.toggle("file");
            }}
            className="fileTypes"
          >
            <button className="folder" id="1">
              folder
            </button>
            <button className="file">file</button>
          </div>
        )}
        <p className="filetype">File Type: {fileType}</p>
        <input type="text" ref={fileNameRef} />
        {error && <p className="error">{error}</p>}
        <button onClick={() => newFileCreateHandler(fileNameRef.current.value)}>
          {modalType}
        </button>
      </div>
    </div>
  );
};

export default Modal;
