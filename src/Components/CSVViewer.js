import React, { useState, useContext } from "react";
import ThemeContext from "../Context/ThemeContext";
import ColorThemes from "../Colors";

const CSVViewer = ({ csvData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const theme = useContext(ThemeContext)[0];
  const currentTheme = ColorThemes[theme];

  // Calculate the index range of the current page
  const header = csvData.data[0];
  const totalPages = Math.ceil((csvData.data.length - 1) / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = csvData.data.slice(indexOfFirstRow, indexOfLastRow);

  // Handle pagination
  const paginate = (pageNumber) => {
    if(pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <section className={`mx-auto w-full max-w-9/10 px-4 py-4 ${currentTheme.bodyBackgroundColor} ${currentTheme.bodyColor}`}>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Employees</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all employees. You can add new employees, edit
              or delete existing ones.
            </p>
          </div>
          <div>
            <button
              type="button"
              className={`rounded-md ${currentTheme.bodyBtnBackgroundColor} px-3 py-2 text-sm font-semibold ${currentTheme.bodyBtnColor} shadow-sm hover:${currentTheme.bodyBtnBackgroundColor}/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
            >
              Add new employee
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className={`${currentTheme.headerBackgroundColor}`}>
                    <tr className="divide-x divide-gray-200">
                      {header.map((item, index) => (
                        <th
                          key={index}
                          scope="col"
                          className={`px-4 py-3.5 text-left text-sm font-semibold ${currentTheme.headerColor}`}
                        >
                          <span>{item}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className={`divide-y divide-gray-200 ${currentTheme.bodyBackgroundColor}`}>
                    {currentRows.map((row, index) => (
                      <tr key={index} className="divide-x divide-gray-200">
                        {row.map((item, index) => (
                          <td
                            key={index}
                            className="whitespace-nowrap px-4 py-4"
                          >
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className={`text-sm font-medium ${currentTheme.bodyColor}`}>
                                  {item}
                                </div>
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full border-gray-300">
          <div className="mt-2 flex items-center justify-end">
            <div className="space-x-2">
              <button
                type="button"
                className={`rounded-md ${
                  currentPage === 1 ? `${currentTheme.bodyBtnBackgroundColor}/80` : `${currentTheme.bodyBtnBackgroundColor}`
                } px-3 py-2 text-sm font-semibold ${currentTheme.bodyBtnColor} shadow-sm hover:${currentTheme.bodyBtnBackgroundColor}/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
                onClick={() => {
                  paginate(currentPage - 1)
                }}
              >
                &larr; Previous
              </button>
              <button
                type="button"
                className={`rounded-md ${
                  currentPage === totalPages ? `${currentTheme.bodyBtnBackgroundColor}/80` : `${currentTheme.bodyBtnBackgroundColor}`
                } px-3 py-2 text-sm font-semibold ${currentTheme.bodyBtnColor} shadow-sm hover:${currentTheme.bodyBtnBackgroundColor}/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
                onClick={() => {
                  paginate(currentPage + 1)
                }}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CSVViewer;
