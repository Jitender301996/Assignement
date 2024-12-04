import React, { useState } from "react";
import "./Table.css";

const Table = ({ data, columns, onAction, tableTitle }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]); // State to track selected rows

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter((item) =>
    columns.some((col) =>
      String(item[col.key] || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (type) => {
    if (type === "next" && currentPage < totalPages) setCurrentPage(currentPage + 1);
    else if (type === "prev" && currentPage > 1) setCurrentPage(currentPage - 1);
    else if (type === "first") setCurrentPage(1);
    else if (type === "last") setCurrentPage(totalPages);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId) // Unselect if already selected
        : [...prevSelected, itemId] // Select if not already selected
    );
  };

  return (
    <div className="table-container">
      <div className="table-header">
        {tableTitle && <h2>{tableTitle}</h2>}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            {/* Add a checkbox column for selecting rows */}
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === data.length} // Select all when all rows are selected
                onChange={() =>
                  setSelectedRows(
                    selectedRows.length === data.length ? [] : data.map((item) => item.id)
                  )
                }
              />
            </th>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item.id}>
                {/* Checkbox for individual row selection */}
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)} // Check if the current row is selected
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="no-data">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <div className="items-per-page">
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            {[10, 25, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="pagination-controls">
          <button onClick={() => handlePageChange("first")} disabled={currentPage === 1}>
            &lt;&lt;
          </button>
          <button onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
            &lt;
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => handlePageChange("next")} disabled={currentPage === totalPages}>
            &gt;
          </button>
          <button onClick={() => handlePageChange("last")} disabled={currentPage === totalPages}>
            &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
