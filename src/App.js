import React, { useState } from "react";
import ThemeContext from "./Context/ThemeContext";
import Header from "./Components/Header";
import FileUploadModal from "./Components/FileUploadModal";
import CSVViewer from "./Components/CSVViewer";
// import ColorThemes from "./Colors";
import "./App.css";
import peepingCat from "./Assets/peepingCat.png";

function App() {
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [csvData, setCSVData] = useState([]);
  const themeHook = useState("light");
  // const currentTheme = ColorThemes[themeHook[0]];

  return (
    <div className={`App `}>
      <ThemeContext.Provider value={themeHook}>
        <Header setShowFileUploadModal={setShowFileUploadModal} />

        {showFileUploadModal && (
          <FileUploadModal
            setCSVData={setCSVData}
            setShowFileUploadModal={setShowFileUploadModal}
          />
        )}

        {csvData.length !== 0 && !showFileUploadModal ? (
          <CSVViewer csvData={csvData} />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <img className="h-96" src={peepingCat} alt="..." />
            <p className="text-2xl font-semibold">No File Uploaded Yet.</p>
            <p className="text-md">Upload a .CSV file to View it.</p>
          </div>
        )}
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
