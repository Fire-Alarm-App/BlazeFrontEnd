import "./DataTable.css";

const DataTable = ({ data, onDropdownChange, onButtonClick }) => {
    const alarms = data && data.alarms ? data.alarms : [];
    const users = data && data.users ? data.users : [];

    console.log(alarms, users, data)

    return (
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Alarm Serial</th>
              <th>Location</th>
              <th>Primary User</th>
              <th>Commit</th>{/* Empty header for button column */}
            </tr>
          </thead>
          <tbody>
            {alarms.map((alarm) => (
              <tr key={alarm.serial}>
                <td>{alarm.serial}</td>
                <td>
                    <input type="text" defaultValue={alarm.location} />
                </td>
                <td>
                  {/* Dropdown menu for actions */}
                  <select name="actions" value={alarm.username} onChange={(e) => onDropdownChange(e, alarm)}>
                    <option key="" value="null">No User Assigned</option>
                      {users.map((username) => (
                        <option key={username} value={username}>
                            {username}
                        </option>
                    ))}
                  </select>
                </td>
                <td>
                  {/* Button column */}
                  <button onClick={() => onButtonClick(alarm)}>Save Changes</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  export default DataTable;