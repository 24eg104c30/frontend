import React, { useState, useEffect } from 'react';

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('');

  const API = "http://localhost:8080/api/employees";

  useEffect(() => {
    fetch(API).then(r => r.json()).then(d => setEmployees(d));
  }, []);

  const addEmployee = () => {
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, department: dept || 'ECE' })
    }).then(r => r.json()).then(newEmp => {
      setEmployees([...employees, newEmp]);
      setName(''); setEmail(''); setDept('');
    });
  };

  const deleteEmployee = (id) => {
    fetch(API + "/" + id, { method: 'DELETE' })
      .then(() => setEmployees(employees.filter(e => e.id !== id)));
  };

  // CSS only - JavaScript style objects
  const boxStyle = {
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  };
  const inputStyle = { padding: '8px', margin: '5px', borderRadius: '5px', border: '1px solid #ccc' };
  const btnStyle = { padding: '8px 15px', margin: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
  const rowStyle = { display: 'flex', justifyContent: 'space-between', padding: '10px', margin: '5px auto', backgroundColor: 'white', width: '80%', borderRadius: '5px', boxShadow: '0 1px 3px #ccc' };

  return React.createElement('div', { style: boxStyle },
    React.createElement('h2', { style: { color: '#333' } }, 'Employee Management System - Kavya'),
    React.createElement('p', null, 'Roll: 24EG104C30 - Anurag University - ECE'),
    
    React.createElement('div', null,
      React.createElement('input', { style: inputStyle, placeholder: 'Name', value: name, onChange: e => setName(e.target.value) }),
      React.createElement('input', { style: inputStyle, placeholder: 'Email', value: email, onChange: e => setEmail(e.target.value) }),
      React.createElement('input', { style: inputStyle, placeholder: 'Dept', value: dept, onChange: e => setDept(e.target.value) }),
      React.createElement('button', { style: btnStyle, onClick: addEmployee }, 'Add Employee')
    ),
    
    React.createElement('div', { style: { marginTop: '20px' } },
      employees.map(emp =>
        React.createElement('div', { key: emp.id, style: rowStyle },
          React.createElement('span', null, emp.id + ' | ' + emp.name + ' | ' + emp.email + ' | ' + emp.department),
          React.createElement('button', { style: { ...btnStyle, backgroundColor: 'red' }, onClick: () => deleteEmployee(emp.id) }, 'Delete')
        )
      )
    )
  );
}

export default App;