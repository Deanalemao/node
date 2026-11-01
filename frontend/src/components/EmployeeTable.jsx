import { Edit2, Trash2, Users } from "lucide-react";

function initials(name = "") {
  return name.split(" ").filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase();
}

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  if (!employees.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon"><Users size={25} /></div>
        <h3>No employees found</h3>
        <p>Try a different search or add your first employee.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>EMPLOYEE</th>
            <th>DEPARTMENT</th>
            <th>ANNUAL SALARY</th>
            <th className="actions-heading">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>
                <div className="person-cell">
                  <div className="avatar">{initials(employee.name)}</div>
                  <div>
                    <strong>{employee.name}</strong>
                    <span>{employee.email}</span>
                  </div>
                </div>
              </td>
              <td><span className="department-pill">{employee.department}</span></td>
              <td className="salary">${Number(employee.salary).toLocaleString("en-US", { maximumFractionDigits: 2 })}</td>
              <td>
                <div className="row-actions">
                  <button className="icon-button edit" onClick={() => onEdit(employee)} aria-label={`Edit ${employee.name}`}><Edit2 size={16} /></button>
                  <button className="icon-button delete" onClick={() => onDelete(employee)} aria-label={`Delete ${employee.name}`}><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
