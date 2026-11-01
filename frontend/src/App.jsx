import { useEffect, useMemo, useState } from "react";
import { Activity, BriefcaseBusiness, Search, UserPlus, Users } from "lucide-react";
import api from "./api";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  async function loadEmployees() {
    try {
      setError("");
      const response = await api.get("/employees");
      setEmployees(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load employees. Check that the backend and MongoDB are running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return employees;
    return employees.filter(employee =>
      [employee.name, employee.email, employee.department].some(value =>
        value?.toLowerCase().includes(search)
      )
    );
  }, [employees, query]);

  function openAddForm() {
    setEditingEmployee(null);
    setShowForm(true);
  }

  function openEditForm(employee) {
    setEditingEmployee(employee);
    setShowForm(true);
  }

  async function saveEmployee(formData) {
    try {
      setSaving(true);
      if (editingEmployee) {
        await api.put(`/employees/${editingEmployee._id}`, formData);
        setNotice("Employee details updated.");
      } else {
        await api.post("/employees", formData);
        setNotice("Employee added successfully.");
      }
      setShowForm(false);
      setEditingEmployee(null);
      await loadEmployees();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save employee.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteEmployee(employee) {
    const confirmed = window.confirm(`Delete ${employee.name}? This action cannot be undone.`);
    if (!confirmed) return;

    try {
      await api.delete(`/employees/${employee._id}`);
      setNotice("Employee deleted.");
      await loadEmployees();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete employee.");
    }
  }

  const departments = new Set(employees.map(employee => employee.department)).size;

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-mark"><BriefcaseBusiness size={19} /></span>
          <span>people<span className="brand-accent">desk</span></span>
        </a>
        <div className="topbar-right">
          <span className="status-dot" />
          <span>Workspace overview</span>
        </div>
      </header>

      <section className="page-content">
        <div className="page-heading">
          <div>
            <p className="eyebrow">PEOPLE OPERATIONS</p>
            <h1>Employee directory</h1>
            <p className="subtitle">Manage your team, employee details, and records in one place.</p>
          </div>
          <button className="button button-primary add-button" onClick={openAddForm}>
            <UserPlus size={17} /> Add employee
          </button>
        </div>

        <section className="stats-grid">
          <article className="stat-card">
            <div className="stat-icon blue"><Users size={19} /></div>
            <div><span>Total employees</span><strong>{employees.length}</strong></div>
          </article>
          <article className="stat-card">
            <div className="stat-icon purple"><BriefcaseBusiness size={19} /></div>
            <div><span>Departments</span><strong>{departments}</strong></div>
          </article>
          <article className="stat-card">
            <div className="stat-icon green"><Activity size={19} /></div>
            <div><span>Directory status</span><strong className="active-status">Active</strong></div>
          </article>
        </section>

        <section className="directory-card">
          <div className="directory-heading">
            <div>
              <h2>All employees</h2>
              <p>{filteredEmployees.length} {filteredEmployees.length === 1 ? "record" : "records"} displayed</p>
            </div>
            <div className="search-box">
              <Search size={17} />
              <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search employees..." aria-label="Search employees" />
            </div>
          </div>

          {notice && <div className="notice">{notice}<button onClick={() => setNotice("")}>×</button></div>}
          {error && <div className="error-banner">{error}<button onClick={() => setError("")}>×</button></div>}

          {loading ? (
            <div className="loading-state">Loading employee records...</div>
          ) : (
            <EmployeeTable employees={filteredEmployees} onEdit={openEditForm} onDelete={deleteEmployee} />
          )}
        </section>
        <footer>PeopleDesk <span>·</span> Employee Management System</footer>
      </section>

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={saveEmployee}
          onClose={() => setShowForm(false)}
          saving={saving}
        />
      )}
    </main>
  );
}
