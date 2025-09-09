// import { useEffect, useState } from 'react'
// import './App.css'

// function App() {
//   const [tasks, setTasks] = useState(() => {
//     const saved = localStorage.getItem('tasks');
//     return saved ? JSON.parse(saved) : [];
//   });
//   const [input, setInput] = useState("");
//   const [dueDate, setDueDate] = useState('');
//   const [filter, setFilter] = useState('all');
//   const [editingId, setEditingId] = useState(null);
//   const [editInput, setEditInput] = useState('');
//   const [editDueDate, setEditDueDate] = useState('');

//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   function addTask() {
//     if (input.trim() === "") return;
//     setTasks([
//       ...tasks,
//       {
//         id: Date.now(),
//         text: input,
//         completed: false,
//         dueDate: dueDate || null,
//       },
//     ]);
//     setInput("");
//     setDueDate('');
//   }

//   function deleteTask(id) {
//     setTasks(
//       tasks.filter((task) => task.id !== id)
//     )
//   }

//   function toggleTask(id) {
//     setTasks(
//       tasks.map((task) =>
//         task.id === id
//           ? { ...task, completed: !task.completed }
//           : task
//       )
//     )
//   }

//   function startEdit(task) {
//     setEditingId(task.id);
//     setEditInput(task.text);
//     setEditDueDate(task.dueDate || '');
//   }

//   function saveEdit(id) {
//     setTasks(
//       tasks.map((task) =>
//         task.id === id
//           ? { ...task, text: editInput, dueDate: editDueDate }
//           : task
//       )
//     );
//     setEditingId(null);
//     setEditInput('');
//     setEditDueDate('');
//   }

//   function clearCompleted() {
//     setTasks(tasks.filter((task) => !task.completed));
//   }

//   function filteredTasks() {
//     if (filter === 'active') return tasks.filter((t) => !t.completed);
//     if (filter === 'completed') return tasks.filter((t) => t.completed);
//     return tasks;
//   }

//   return (
//     <div style={{ maxWidth: 500, margin: '2rem auto' }}>
//       <h1>To-Do List</h1>
//       <div>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter a new task"
//         />
//         <input
//           type="date"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//           style={{ marginLeft: '0.5rem' }}
//         />
//         <button onClick={addTask} style={{ marginLeft: '0.5rem' }}>
//           Add!
//         </button>
//       </div>
//       <div style={{ margin: '1rem 0' }}>
//         <button onClick={() => setFilter('all')} disabled={filter === 'all'}>
//           All
//         </button>
//         <button onClick={() => setFilter('active')} disabled={filter === 'active'} style={{ marginLeft: '0.5rem' }}>
//           Active
//         </button>
//         <button onClick={() => setFilter('completed')} disabled={filter === 'completed'} style={{ marginLeft: '0.5rem' }}>
//           Completed
//         </button>
//         <button onClick={clearCompleted} style={{ marginLeft: '1rem', color: 'red' }}>
//           Clear Completed
//         </button>
//       </div>
//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {filteredTasks().map((task) => (
//           <li key={task.id} style={{ margin: '1rem 0' }}>
//             {editingId === task.id ? (
//               <>
//                 <input
//                   value={editInput}
//                   onChange={(e) => setEditInput(e.target.value)}
//                 />
//                 <input
//                   type="date"
//                   value={editDueDate}
//                   onChange={(e) => setEditDueDate(e.target.value)}
//                   style={{ marginLeft: '0.5rem' }}
//                 />
//                 <button onClick={() => saveEdit(task.id)} style={{ marginLeft: '0.5rem' }}>
//                   Save
//                 </button>
//                 <button onClick={() => setEditingId(null)} style={{ marginLeft: '0.5rem' }}>
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <span
//                   onClick={() => toggleTask(task.id)}
//                   style={{
//                     textDecoration: task.completed ? 'line-through' : 'none',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   {task.text}
//                 </span>
//                 {task.dueDate && (
//                   <span style={{ marginLeft: '0.5rem', color: '#888', fontSize: '0.9em' }}>
//                     (Due: {task.dueDate})
//                   </span>
//                 )}
//                 <button
//                   onClick={() => startEdit(task)}
//                   style={{ marginLeft: '0.5rem' }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteTask(task.id)}
//                   style={{ marginLeft: '0.5rem' }}
//                 >
//                   Delete
//                 </button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }
// export default App;