import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import DataTable from './DataTable';

const ITEMS_PER_PAGE = 10;

const ParentComponent = () => {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Authorization token not found in localStorage.");
          return;
        }

        const response = await axios.get('http://localhost:4000/dashboard', {
          headers: { Authorization: token }
        });

        const alarms = response.data.alarms.map(alarm => ({
          serial: alarm[0],
          location: alarm[1],
          username: alarm[2] ? alarm[2] : "null"
        }));

        const users = response.data.users.map(user => user['username']);

        setData({
          alarms,
          users
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onButtonClick = async (updatedAlarm) => {
    try {
      // Construct the API endpoint
      const endpoint = 'http://localhost:4000/alarm';
  
      // Prepare the data to send in the body of the request
      const updateData = {
        alarmSerial: updatedAlarm.serial,
        location: updatedAlarm.location,
        username: updatedAlarm.username === "null" ? "" : updatedAlarm.username, // Empty string if "null"
      };
  
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Authorization token not found.");
        return;
      }
  
      // Make the API call with the authorization header
      const response = await axios.post(endpoint, updateData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token  // Use the token from localStorage
        }
      });
  
      // Log or handle the successful response
      console.log('Alarm configuration successful:', response.data);
      // Optionally, update your UI here to reflect the changes
      alert('Successfully updated alarm information');
    } catch (error) {
      // Log or handle any errors that occur during the API call
      console.error('Failed to configure alarm:', error.response ? error.response.data : error);
    }
  };

  const onDropdownChange = (selectedValue, alarmToUpdate) => {
    // Map over alarms to update the username or set it to null if "No User Assigned" is selected
    const updatedAlarms = data.alarms.map(alarm => {
      if (alarm.serial === alarmToUpdate.serial) {
        return { ...alarm, username: selectedValue === "null" ? null : selectedValue };
      }
      return alarm;
    });


    
    
  
    // Update the state with the new alarms array
    setData(prevData => ({
      ...prevData,
      alarms: updatedAlarms
    }));
  };
  const currentPageData = data.alarms ? data.alarms.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) : [];

  const inputData = {
    alarms: currentPageData,
    users: data.users || []
  };

  const total_alarms = data.alarms ? data.alarms.length : 0;

  return (
    <div>
      <DataTable
        data={inputData}
        onDropdownChange={onDropdownChange}
        onButtonClick={onButtonClick}
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
