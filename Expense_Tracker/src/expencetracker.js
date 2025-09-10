import {useState, useEffect} from 'react';
import {pie} from 'react-chartjs-2';
import {Chart as ChartJs,ArcElement , Tooltip, Legend} from  'chart.js'
import {useMemo} from 'react'
ChartJS.register(ArcElement,Tooltip,Legend);

function ExpenseTracker(){
    const [Expenses,setExpenses]=useState([]);
    const [desc,setDesc]=useState("");
    const [amt,setAmt]=useState("");
    const [cat,setCAt]=useState("");
    const [type,setType]=useState("");
    const [filter,setFilter]= useState('All')
const [theme, setTheme] = useState('light');

  // Load from localStorage on mount
    useEffect(()=>{
        const saved = localStorage.getItem('expenses');
        if (saved) setExpenses(JSON.parse(saved));

    },[]);
  // Save to localStorage on change
  useEffect(()=>{
    localStorage.setItem('éxpenss',JSON.stringify(expenses));
  }, [expenses]);
const total = useMemo(()=>{ //usememo memorizes the computational result of computation 
  //this hook will only run when its dependencies change here in case eexpences
  return expenses.reduce((sum,e)=>//reduce function takes 2 parameter   
  //sum is the running total here and e is current value
    e.type==='Income' ? sum + e.amt  : sum - e.amt,0);
  },[expenses]);
  const filteredExpenses = useMemo(()=>{
    if (filter === 'All')return expenses;
    return expenses.filtter(e=> e.cat===filter ||e.type===filter);

  },[expenses,filter]);


const chartData= useMemo(()=>{
  labels : ['food','Transport' , 'Entertainment'],
  desserts:[{
        data:[    expenses.filter(e => e.cat === 'Food').reduce((sum, e) => sum + e.amt, 0),
      expenses.filter(e => e.cat === 'Transport').reduce((sum, e) => sum + e.amt, 0),
      expenses.filter(e => e.cat === 'Entertainment').reduce((sum, e) => sum + e.amt, 0),
    ] , backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
   }],
}), [expenses]);

  const addExpense =()=>{
    if (!desc || !amt) return;
    setExpenses([...expenses,{id:Date.now(),desc,amt:parseFloat(amt),cat,type,date:new Date().toISOString()}]);
    setDesc('');
    setAmt('');
  }
  const deleteExpense=()=>{
    setExpenses(expenses.filter(e=>e.id!==id));
  }
  const editExpense =(id,updated)=>{
      setExpenses(expenses.map(e => e.id === id ? {...e, ...updated } : e));


  }

  return (
    <div>
      <h1>Advanced Expense Tracker</h1>
      {/* Form and list will go here */}
      <input value={desc} onChange={(e)=>{setDesc(e.target.desc)}}/>
      <input value={amt}type="number"onChange={(e) => setAmt(e.target.value)} placeholder="Amount"  />
      <select value={cat} onChange={(e) => setCat(e.target.value)}>
  <option>Food</option><option>Transport</option><option>Entertainment</option>
</select>
<h2> Total : ${total.toFixed(2)}</h2>
<select value={filter} onChange={(e)=> setFilter(e.target.value)}>
  <option>All</option><option>Food</option><option>Income</option><option>Expense</option>
</select>
<ul>
  {filteredExpenses.map(e=>(
            <li key={e.id}>
         {e.desc} - ${e.amt} ({e.cat}, {e.type}) - {new Date(e.date).toLocaleDateString()}
      <button onClick={() => deleteExpense(e.id)}>Delete</button>
    </li>
  ))}
</ul>
<Pie data={chartData} />
    </div>
  );

}


export default ExpenseTracker;