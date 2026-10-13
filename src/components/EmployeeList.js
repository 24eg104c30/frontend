import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
import './EmployeeList.css';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = () => {
        EmployeeService.getAllEmployees()
            .then(res => setEmployees(res.data))
            .catch(err => console.log("Backend not started yet:", err));
    };

    const saveEmployee = (e) => {
        e.preventDefault();
        EmployeeService.createEmployee(name, email)
            .then(() => {
                setName('');
                setEmail('');
                loadEmployees();
            })
            .catch(err => alert("Save failed: " + err.message));
    };

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id)
            .then(() => loadEmployees())
            .catch(err => alert("Delete failed: " + err.message));
    };

    return (
        <div className="container">
            <h2>Employee Management System</h2>
            <form onSubmit={saveEmployee}>
                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <button type="submit">Add Employee</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td><button onClick={() => deleteEmployee(emp.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;