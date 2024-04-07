import "./DataTable.css";

const DataTable = ({ data, onDropdownChange, onButtonClick }) => {
    return (
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
              <th>Commit</th> {/* Empty header for button column */}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  {/* Dropdown menu for actions */}
                  <select name="actions" onChange={(e) => onDropdownChange(e, item)}>
                    <option value="">Select Action</option>
                    <option value="add">Add</option>
                    <option value="remove">Remove</option>
                  </select>
                </td>
                <td>
                  {/* Button column */}
                  <button onClick={() => onButtonClick(item)}>Click Me</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  export default DataTable;