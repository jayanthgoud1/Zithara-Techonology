import React, { useState } from 'react';
import './assets/css/table.css';

function DataDisplay({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null); // State to manage sorting
  const [sortOrder, setSortOrder] = useState('asc'); // State to manage sort order
  const itemsPerPage = 20; // Number of items to display per page

  // Calculate total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle sorting
  const handleSort = (key) => {
    if (sortBy === key) {
      // If already sorting by the same key, reverse the sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If sorting by a new key, set the new key and default to ascending order
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  // Sort the data array based on the selected key and sort order
  let sortedData = [...data];
  if (sortBy) {
    sortedData = sortedData.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
      } else if (sortBy === 'time') {
        return sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
      }
      return 0;
    });
  }

  // Slice the sorted data array to display only the items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedData.slice(startIndex, endIndex);

  function formatDate(date, val) {
    const dt = new Date(date);
    const day = dt.getDate().toString().padStart(2, '0'); // Ensure two digits for day
    const month = (dt.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits for month
    const year = dt.getFullYear().toString().slice(-2); // Get last two digits of year
    const hours = dt.getHours().toString().padStart(2, '0'); // Ensure two digits for hours
    const minutes = dt.getMinutes().toString().padStart(2, '0'); // Ensure two digits for minutes
    const seconds = dt.getSeconds().toString().padStart(2, '0'); // Ensure two digits for seconds

    if (val) return `${day}-${month}-${year}`;
    else return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <div>
      <br />
      <table className="styled-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Customer Name</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Age</th>
            <th onClick={() => handleSort('date')} className={sortBy === 'date' ? 'active-header' : ''} style={{ cursor: 'pointer' }}>Date</th>
            <th onClick={() => handleSort('time')} className={sortBy === 'time' ? 'active-header' : ''} style={{ cursor: 'pointer' }}>Time</th>

          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{startIndex + index + 1}</td>
              <td>{item.name}</td>
              <td>{item.gender}</td>
              <td>{item.year}</td>
              <td>{item.gpa}</td>
              <td>{formatDate(item.date, true)}</td>
              <td>{formatDate(item.date, false)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination buttons */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? 'active' : ''}
              style={{ marginLeft: 10 }}>
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default DataDisplay;
