import { Fab } from "@mui/material";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import "../styles/drag_drop.css"
const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <FileUploader 
    handleChange={handleChange} 
    name="file" 
    types={fileTypes} 
    multiple={false} 
    label="Browse or drop here" 
    hoverTitle="Yes, inside this box"  
    onTypeError = {(err)=>console.log(err)}  
    
    onSizeError = {(err)=>console.log(err)}
    children = {<div className="file-drop-area" id="fileDropArea">
        <div className="file-drop-inner">
            
          <p>Drop files here</p>
          <p>or</p>
          <button id="browseButton">Browse File</button>
        </div>
        </div>}

      onDrop = {
        console.log(file)
      }
    />
  );
}


export default DragDrop;