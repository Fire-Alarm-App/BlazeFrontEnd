import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you are using axios for API requests
import Pagination from './Pagination';
import DataTable from './DataTable';

const ITEMS_PER_PAGE = 10;

const ParentComponent = () => {
  const [data, setData] = useState({}); // This will store the data fetched from the API
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
            Authorization: token
          }
        });

        const alarms = [];
        response.data.alarms.forEach((alarm) => {
          const username = alarm[2] ? alarm[2] : "null"
          alarms.push({
            serial: alarm[0],
            location: alarm[1],
            username: username
          });
        });

        const users = [];
        response.data.users.forEach((user) => {
          users.push(user['username']);
        });

        const data = {
          "alarms": alarms,
          "users": users
        }

        setData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onDropdownChange = (event, alarm) => {
  };

  const currentPageData = [];
  if (data.alarms)
    for (let i = currentPage - 1; i < currentPage * ITEMS_PER_PAGE; i++) {
      if (!data.alarms[i])
        break;
      currentPageData.push(data.alarms[i]);
    }

  const inputData = {
      "alarms": currentPageData,
      "users": data.users
  };

  const total_alarms = data.alarms ? data.alarms.length : 0
  return (
    <div>
      <DataTable
          data={inputData}
          onDropdownChange={onDropdownChange}
      />
      <Pagination
        currentPage={currentPage}
        total={total_alarms}
        limit={ITEMS_PER_PAGE}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ParentComponent;
