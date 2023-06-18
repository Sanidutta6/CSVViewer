import React, { useState, useRef } from "react";
import Papa from "papaparse";
import upload from "../Assets/upload.jpg";

const FileUploadModal = ({ setCSVData, setShowFileUploadModal }) => {
  const [highlighted, setHighlighted] = useState(false);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    // Do something with the selected file
    if (uploadedFile.type === "text/csv") {
      setFile(uploadedFile);
    }
  };

  const closeUploadArea = () => {
    setHighlighted(false);
    setFile(null);
    setErrorMessage("");
    setShowFileUploadModal(false);
  };

  const handleImportFileBtn = () => {
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          if (result.data.length <= 0) {
            setErrorMessage("Error parsing CSV file.");
          } else {
            setCSVData(result);
          }
        },
      });
      closeUploadArea();
    }
  };

  return (
    <div className="absolute top-0 left-0 flex h-screen w-screen items-center justify-center bg-blue-200 bg-opacity-50 backdrop-filter backdrop-blur">
      <div className="w-3/5 rounded bg-white px-5 py-6 text-black">
        {/* Header */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-semibold">Upload and Attach File</h1>
            <p className="text-xs text-gray-400">Supported Formats: .csv</p>
          </div>
          <div className="text-3xl cursor-pointer" onClick={closeUploadArea}>
            &times;
          </div>
        </div>

        {/* Conditional Rendering */}
        {!file ? (
          // Upload area
          <div
            className={`flex flex-col justify-center items-center mt-8 py-4 w-full rounded-md border-2 ${
              highlighted
                ? "border-solid border-green-600 bg-green-100"
                : "border-dashed border-blue-600"
            }`}
            onDragEnter={() => {
              setHighlighted(true);
            }}
            onDragLeave={() => {
              setHighlighted(false);
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              setHighlighted(false);
              const uploadedFile = Array.from(e.dataTransfer.files).filter(
                (file) => file.type === "text/csv"
              )[0];
              if (uploadedFile) {
                setFile(uploadedFile);
              }
            }}
          >
            <img className="w-2/5" draggable={false} src={upload} alt="" />
            <div className="text-center">
              <span
                onClick={handleButtonClick}
                className="underline cursor-pointer"
              >
                Click to Upload
              </span>
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <span> or drag and drop.</span>
              <p className="text-xs text-gray-500">Maximum File Size: 50 MB.</p>
            </div>
          </div>
        ) : (
          // Uploaded file content
          <div className="py-4 text-center text-base">
            {errorMessage !== ""
              ? `<div className="text-red-500">${errorMessage}</div>`
              : `${file.name} [${Math.round(file.size / 1024).toFixed(2)} MB]`}
            {/* check box for setHeader */}
          </div>
        )}

        {/* Horizontal line */}
        <hr className="my-6 h-[1px] bg-slate-200" />

        {/* Upload Buttons */}
        <div className="text-right">
          <button
            className="w-24 mr-2 border-[1px] py-2 rounded-lg text-sm font-semibold"
            onClick={closeUploadArea}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white w-24 py-2 rounded-lg text-sm font-semibold"
            onClick={handleImportFileBtn}
          >
            Import File
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;