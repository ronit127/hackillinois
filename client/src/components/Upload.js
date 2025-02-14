import React, { useState } from "react";
import axios from "axios";
import "../style/upload.css";

function Upload() {
  const [fileContents, setFileContents] = useState([]); // State to store file contents
  const [fileNames, setFileNames] = useState([]); // State to store file names

  const handleUpload = (event) => {
    const formData = new FormData();
    const files = event.target.files; // Get the selected files

    // Loop through each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append("file", file); // Append each file with the same field name

      // Add file name to the state
      setFileNames((prevFileNames) => [...prevFileNames, file.name]);
    }

    axios
      .post("http://127.0.0.1:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Assuming the response contains the content of the files
        console.log("File content:", response.data);
        // Set the file contents to state to display them
        setFileContents((prevFileContents) => [
          ...prevFileContents,
          response.data,
        ]);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <div>
      <label htmlFor="file-upload" className="custom-file-upload">
        Upload
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleUpload}
        multiple // Allow multiple file selection
      />
      {/* Display the uploaded file names */}
      {fileNames.map((fileName, index) => (
        <p key={index}>Uploaded File: {fileName}</p>
      ))}
    </div>
  );
}

export default Upload;
