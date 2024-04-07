import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you are using axios for API requests
import Pagination from './Pagination';
import DataTable from './DataTable';

const ITEMS_PER_PAGE = 10;

const ParentComponent = () => {
  const [data, setData] = useState([]); // This will store the data fetched from the API
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Check if the token exists before making the request
        if (!token) {
          console.error("Authorization token not found in localStorage.");
          return;
        }

        // Include the token in the Authorization header of the request
        const response = await axios.get('http://localhost:4000/dashboard', {
          headers: {
            Authorization: {token} 
          }
        });

        setData(response.data.alarms);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentPageData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <DataTable data={currentPageData} />
      <Pagination
        currentPage={currentPage}
        total={data.length}
        limit={ITEMS_PER_PAGE}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ParentComponent;
