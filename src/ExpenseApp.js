import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseApp = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);

  //const apiUrl = 'http://localhost:5000/expenses';

  const apiUrl = `${process.env.REACT_APP_API_URL}/expenses`;


  useEffect(() => {
    axios.get(apiUrl)
      .then(res => {
        console.log('GET expenses:', res.data);
        setExpenses(res.data);
      })
      .catch(err => console.error('GET Error:', err));
  }, []);

  const handleAddExpense = () => {
    if (!description || !amount) {
      alert('Please enter both description and amount');
      return;
    }

    const newExpense = { description, amount: Number(amount) };
    axios.post(apiUrl, newExpense)
      .then(res => {
        console.log('POST success:', res.data);
        setExpenses([...expenses, res.data]);
        setDescription('');
        setAmount('');
      })
      .catch(err => {
        console.error('POST error:', err);
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Expense Tracker</h2>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={handleAddExpense}>
        {editingExpense ? 'Update' : 'Add'}
      </button>

      <ul>
        {expenses.map(exp => (
          <li key={exp._id}>
            {exp.description} - ₹{exp.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseApp;
