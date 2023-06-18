import React, {useContext} from "react";
import ThemeContext from "../Context/ThemeContext";
import ColorThemes from "../Colors";

const Header = ({setShowFileUploadModal}) => {
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const currentTheme = ColorThemes[themeMode];

  return (
    <div className="bg-black/80 py-2 px-8 flex items-center justify-between">
      {/* <!-- Brand Info --> */}
      <div className="text-white text-3xl font-semibold">CSV Viewer</div>

      {/* <!-- Header Items --> */}
      <div className="flex gap-4">
        <button
        className={`rounded-md ${currentTheme.headerBackgroundColor} px-3 py-2 text-sm font-semibold ${currentTheme.headerColor} shadow-sm hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
        onClick={() => (setShowFileUploadModal(true))}
        >
          Import CSV
        </button>
        <button
        className={`rounded-md ${currentTheme.headerBackgroundColor} px-3 py-2 text-sm font-semibold ${currentTheme.headerColor} shadow-sm hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
        onClick={() => setThemeMode(themeMode === "light"? "dark":"light")}
        >
          {themeMode === "light"? "Turn Off": "Lights On"}
        </button>
      </div>
    </div>
  );
};

export default Header;
