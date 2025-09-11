import { useState, useEffect, useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Main component for the Advanced Expense Tracker
function ExpenseTracker() {
  // State for expenses list
  const [expenses, setExpenses] = useState([]);
  // State for form inputs
  const [desc, setDesc] = useState('');
  const [amt, setAmt] = useState('');
  const [cat, setCat] = useState('Food');
  const [type, setType] = useState('Expense');
  // State for filtering
  const [filter, setFilter] = useState('All');
  // State for theme
  const [theme, setTheme] = useState('light');

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Function to add a new expense
  const addExpense = () => {
    if (!desc || !amt) return;
    setExpenses([...expenses, { id: Date.now(), desc, amt: parseFloat(amt), cat, type, date: new Date().toISOString() }]);
    setDesc('');
    setAmt('');
  };

  // Function to delete an expense by ID
  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  // Memoized total calculation
  const total = useMemo(() => {
    return expenses.reduce((sum, e) => e.type === 'Income' ? sum + e.amt : sum - e.amt, 0);
  }, [expenses]);

  // Memoized filtered expenses
  const filteredExpenses = useMemo(() => {
    if (filter === 'All') return expenses;
    return expenses.filter(e => e.cat === filter || e.type === filter);
  }, [expenses, filter]);

  // Memoized chart data with optimized reduce for performance
  const chartData = useMemo(() => {
    const totals = expenses.reduce((acc, e) => {
      acc[e.cat] = (acc[e.cat] || 0) + e.amt;
      return acc;
    }, {});

    return {
      labels: ['Food', 'Transport', 'Entertainment'],
      datasets: [{
        data: [
          totals['Food'] || 0,
          totals['Transport'] || 0,
          totals['Entertainment'] || 0,
        ],
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
      }],
    };
  }, [expenses]);

  // Function to export expenses to CSV
  const exportToCSV = () => {
    const csv = 'Description,Amount,Category,Type,Date\n' + expenses.map(e => `${e.desc},${e.amt},${e.cat},${e.type},${e.date}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
  };

  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}>
      <h1>Advanced Expense Tracker</h1>
      {/* Form inputs */}
      <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
      <input type="number" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="Amount" />
      <select value={cat} onChange={(e) => setCat(e.target.value)}>
        <option>Food</option><option>Transport</option><option>Entertainment</option>
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option>Expense</option><option>Income</option>
      </select>
      <button onClick={addExpense}>Add</button>
      {/* Theme toggle */}
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
      {/* Export button */}
      <button onClick={exportToCSV}>Export to CSV</button>
      <h2>Total: ${total.toFixed(2)}</h2>
      {/* Filter dropdown */}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option>All</option><option>Food</option><option>Income</option><option>Expense</option>
      </select>
      {/* Chart */}
      <Pie data={chartData} />
      {/* Expenses list */}
      <ul>
        {filteredExpenses.map(e => (
          <li key={e.id}>
            {e.desc} - ${e.amt} ({e.cat}, {e.type}) - {new Date(e.date).toLocaleDateString()}
            <button onClick={() => deleteExpense(e.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseTracker;