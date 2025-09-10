import {useState, useEffect} from 'react';
import {pie} from 'react-chartjs-2';
import {Chart as ChartJs,ArcElement , Tooltip, Legend} from  'chart.js'

ChartJS.register(ArcElement,Tooltip,Legend);

function ExpenseTracker(){
    const [expenses,setExpenses]=useState([]);
    const [desc,setDesc]=useState("");
    const [amt,setAmt]=useState("");
    const [cat,setCAt]=useState("");
    const [type,setType]=useState("");
  // Load from localStorage on mount
    useEffect(()=>{
        const saved = localStorage.getItem('expenses');
        if (saved) setExpenses(JSON.parse(saved));

    },[]);
  // Save to localStorage on change
  useEffect(()=>{
    localStorage.setItem('éxpenss',JSON.stringify(expenses));
  }, [expenses]);eturn (
    <div>
      <h1>Advanced Expense Tracker</h1>
      {/* Form and list will go here */}
    </div>
  );
}

export default ExpenseTracker;