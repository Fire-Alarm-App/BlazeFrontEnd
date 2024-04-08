import React, { useEffect, useState } from 'react';
import "./DataTable.css";

const DataTable = ({ data, onDropdownChange, onButtonClick }) => {
  const [editedAlarms, setEditedAlarms] = useState({}); // To store edits

  // Handle location input changes
  const handleLocationChange = (serial, location) => {
    setEditedAlarms(prev => ({ ...prev, [serial]: { ...prev[serial], location } }));
  };

  // Modified onButtonClick to include current state
  const modifiedOnButtonClick = (alarm) => {
    const currentEdits = editedAlarms[alarm.serial];
    const currentLocation = currentEdits ? currentEdits.location : alarm.location;
    const currentUsername = currentEdits ? currentEdits.username : alarm.username;
    onButtonClick({ ...alarm, location: currentLocation, username: currentUsername });
  };

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Alarm Serial</th>
            <th>Location</th>
            <th>Primary User</th>
            <th>Commit</th>
          </tr>
        </thead>
        <tbody>
          {data.alarms.map((alarm) => (
            <tr key={alarm.serial}>
              <td>{alarm.serial}</td>
              <td>
                <input
                  type="text"
                  value={editedAlarms[alarm.serial]?.location || alarm.location}
                  onChange={(e) => handleLocationChange(alarm.serial, e.target.value)}
                />
              </td>
              <td>
                <select
                  name="actions"
                  value={editedAlarms[alarm.serial]?.username || alarm.username || "null"}
                  onChange={(e) => {
                    setEditedAlarms(prev => ({ ...prev, [alarm.serial]: { ...prev[alarm.serial], username: e.target.value } }));
                    onDropdownChange(e.target.value, alarm);
                  }}
                >
                  <option key="unassigned" value="null">No User Assigned</option>
                  {data.users.map((username) => (
                    <option key={username} value={username}>
                        {username}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={() => modifiedOnButtonClick(alarm)}>Save Changes</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;