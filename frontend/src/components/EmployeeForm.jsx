import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  name: "",
  email: "",
  department: "",
  salary: ""
};

export default function EmployeeForm({ employee, onSubmit, onClose, saving }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(employee ? {
      name: employee.name || "",
      email: employee.email || "",
      department: employee.department || "",
      salary: String(employee.salary ?? "")
    } : emptyForm);
  }, [employee]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      ...form,
      salary: Number(form.salary)
    });
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="modal" onMouseDown={event => event.stopPropagation()}>
        <div className="modal-heading">
          <div>
            <p className="eyebrow">{employee ? "UPDATE RECORD" : "NEW RECORD"}</p>
            <h2>{employee ? "Edit employee" : "Add employee"}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close">
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="employee-form">
          <label>
            Full name
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Alex Smith" required maxLength="100" />
          </label>
          <label>
            Email address
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="alex@company.com" required />
          </label>
          <div className="form-row">
            <label>
              Department
              <select name="department" value={form.department} onChange={handleChange} required>
                <option value="">Select department</option>
                <option>Engineering</option>
                <option>Human Resources</option>
                <option>Finance</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>Operations</option>
                <option>Design</option>
              </select>
            </label>
            <label>
              Annual salary
              <input name="salary" type="number" min="0" step="0.01" value={form.salary} onChange={handleChange} placeholder="45000" required />
            </label>
          </div>
          <div className="form-actions">
            <button className="button button-secondary" type="button" onClick={onClose}>Cancel</button>
            <button className="button button-primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : employee ? "Save changes" : "Add employee"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
