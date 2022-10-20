import "./App.css";

import addFile from "./Assests/add_new_button.png";
import { useCallback, useEffect, useState } from "react";
import MyData from "./MyData";
import { BiArrowBack } from "react-icons/bi";
import Modal from "./Modal";

let current_directory = "root";
let selected_file = "";
let selectedType = "file";

const path = ["root"];
let totalPath = "root";
let modalType = "";

const DUMMY_DATA = [
  {
    root: {
      Folder: [],
      File: ["budget.pdf", "profile.jpg"],
    },
  },
];

class dummyNode {
  constructor() {
    this.Folder = [];
    this.File = [];
  }
}

function App() {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setShow(true);
    },
    [setAnchorPoint, setShow]
  );

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  const [isModalShown, setIsModalShown] = useState(false);
  const [isError, setIsError] = useState();
  const [render, setRender] = useState();

  const newFileCreateHandler = (fileName) => {
    if (modalType === "rename") {
      setShow(false);
      if (
        !DUMMY_DATA[0][current_directory][selectedType].find(
          (ele) => ele === fileName.toLowerCase()
        )
      ) {
        DUMMY_DATA[0][current_directory][selectedType].map((value, index) => {
          if (value === selected_file)
            DUMMY_DATA[0][current_directory][selectedType][index] = fileName;
        });
        setIsError("");
        setIsModalShown(false);
      } else {
        setIsError(selectedType + "already exist");
      }
    } else {
      if (!DUMMY_DATA[0][current_directory])
        DUMMY_DATA[0][current_directory] = new dummyNode();
      if (
        !DUMMY_DATA[0][current_directory][selectedType].find(
          (ele) => ele === fileName.toLowerCase()
        )
      ) {
        DUMMY_DATA[0][current_directory][selectedType].push(fileName);
        setIsModalShown(false);
        setIsError("");
      } else {
        setIsError(selectedType + "already exist");
      }
    }
  };
  const folderDblclickedHandler = (folderName) => {
    path.push(folderName);
    totalPath = path.join("/");
    current_directory = folderName;
    setRender((prev) => !prev);
  };
  const backClickHandler = () => {
    if (current_directory !== "root") {
      path.pop(current_directory);
      totalPath = path.join("/");
      let a = totalPath.split("/");
      current_directory = a[a.length - 1];
      setRender((prev) => !prev);
    }
  };
  const contextMenuClickHandler = (e) => {
    modalType = "rename";
    if (e.target.innerText === "Rename") {
      setIsModalShown(true);
    } else if (e.target.innerText === "Delete") {
      DUMMY_DATA[0][current_directory][selectedType].map((value, index) => {
        if (value === selected_file)
          DUMMY_DATA[0][current_directory][selectedType].splice(
            index,
            index === 0 ? 1 : index
          );
        setShow(false);
      });
    }
  };
  const selectedFileHandler = (value, type) => {
    selected_file = value;
    selectedType = type;
  };
  return (
    <div>
      {show ? (
        <ul
          onClick={contextMenuClickHandler}
          className="menu"
          style={{
            top: anchorPoint.y,
            left: anchorPoint.x,
          }}
        >
          <li>Rename</li>
          <li>Delete</li>
        </ul>
      ) : (
        <> </>
      )}

      <BiArrowBack onClick={backClickHandler} className="backArrow" />
      <span className="path">{totalPath}</span>
      <br />
      <hr />
      {DUMMY_DATA.map((ele, index) => {
        return (
          <MyData
            key={index}
            ele={ele}
            folderDblclickedHandler={folderDblclickedHandler}
            current_directory={current_directory}
            selectedFileFromcontextMenu={selectedFileHandler}
          />
        );
      })}
      <img
        src={addFile}
        alt=""
        className="addFile"
        onClick={() => {
          setIsModalShown(true);
          modalType = "create";
        }}
      />
      {isModalShown && (
        <Modal
          newFileCreateHandler={newFileCreateHandler}
          typeClickhandler={(type) => (selectedType = type)}
          error={isError}
          modalType={modalType}
          setIsModalShown={setIsModalShown}
          setShow={setShow}
        />
      )}
    </div>
  );
}

export default App;
