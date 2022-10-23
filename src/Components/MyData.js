import React from "react";
import file from ".././Assests/file.png";
import folder from ".././Assests/folder.png";
import "./MyData.css";

const MyData = ({
  ele,
  folderDblclickedHandler,
  current_directory,
  selectedFileFromcontextMenu,
}) => {
  return (
    <React.Fragment>
      {ele[current_directory]?.Folder &&
        ele[current_directory]?.Folder.map((myEle, index) => {
          return (
            <div
              style={{ display: "inline-block", margin: "20px" }}
              key={index}
            >
              <img
                style={{ cursor: "pointer" }}
                src={folder}
                width={60}
                height={60}
                onDoubleClick={() => folderDblclickedHandler(myEle)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  selectedFileFromcontextMenu(myEle, "Folder");
                }}
              ></img>
              <p>{myEle}</p>
            </div>
          );
        })}
      {ele[current_directory]?.File &&
        ele[current_directory].File.map((myEle, index) => {
          return (
            <div
              data-checked={"." + myEle.split(".")[1]}
              className="fileNameImage"
              style={{ display: "inline-block", margin: "20px" }}
              key={index}
            >
              <img
                src={file}
                width={60}
                height={60}
                onContextMenu={(e) => {
                  e.preventDefault();
                  selectedFileFromcontextMenu(myEle, "File");
                }}
              ></img>
              <p>{myEle}</p>
            </div>
          );
        })}
    </React.Fragment>
  );
};

export default MyData;
