import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { firestore, auth } from '../firebase';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [status, setStatus] = useState("todo");

//   useEffect(() => {
//     const tasksQuery = query(
//       collection(firestore, 'tasks'),
//       where('assignedTo', '==', auth.currentUser.email) // Check email instead of UID
//     );

//     const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
//       const updatedTasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setTasks(updatedTasks);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleDelete = async (taskId) => {
//     try {
//       await deleteDoc(doc(firestore, 'tasks', taskId));
//       console.log('Task deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   const handleEdit = async (taskId, newTitle, newDescription) => {
//     try {
//       await updateDoc(doc(firestore, 'tasks', taskId), { title: newTitle, description: newDescription });
//       console.log('Task edited successfully!');
//     } catch (error) {
//       console.error('Error editing task:', error);
//     }
//   };

//   const handleStatusChange = async (taskId, newStatus) => {
//     try {
//       const taskRef = doc(firestore, 'tasks', taskId);
//       const taskSnapshot = await getDoc(taskRef);
  
//       if (taskSnapshot.exists() && taskSnapshot.data().assignedTo === auth.currentUser.email) {
//         // Update the status only if the task is assigned to the current user
//         await updateDoc(taskRef, { status: newStatus });
//         console.log('Task status updated successfully!');
//       } else {
//         console.error('Task not found or not assigned to the current user.');
//       }
//     } catch (error) {
//       console.error('Error updating task status:', error);
//     }
//   };
  
//   return (
//     <div className='wrapper-tl'>
//       <div className='tasklist' style = {{width:"96vw",padding:"2vh 2vw", backgroundColor:"white",borderStyle:"none none solid none",border:"1px solid " }}>
//         <h2>Task List</h2>
//         {tasks.length === 0 ? (
//           <p>No tasks are assigned.</p>
//         ) : (
//           <table style={{width:"100%", textAlign:"end"}}>
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Task Name</th>
//                 <th>Task Description</th>
//                 <th>Due Date</th>
//                 <th>Completed</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tasks.map((task, index) => (
//                 <tr key={task.id}>
//                   <td>{index + 1}</td>
//                   <td>{task.title}</td>
//                   <td>{task.description}</td>
//                   <td>{task.dueDate}</td>
//                   <td>
//                   <select value={task.status} onChange={(e) => handleStatusChange(task.id, e.target.value)}>
//           <option value="todo">To Do</option>
//           <option value="inProgress">In Progress</option>
//           <option value="completed">Completed</option>
//         </select>
//                   </td>
//                   <td>
//                     <button style={{width:"4vw",marginLeft:"1vw"}} onClick={() => handleEdit(task.id, prompt('Enter new title:', task.title), prompt('Enter new description:', task.description), prompt("Enter new Due Date:", task.dueDate))}>
//                       Edit
//                     </button>
//                     <button style={{width:'4vw',marginLeft:"1vw"}} onClick={() => handleDelete(task.id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskList;
// ... (your existing imports)

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("todo");

  useEffect(() => {
    const tasksQuery = query(
      collection(firestore, 'tasks'),
      where('assignedTo', '==', auth.currentUser.email)
    );

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const updatedTasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(updatedTasks);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await deleteDoc(doc(firestore, 'tasks', taskId));
      alert('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = async (taskId, newTitle, newDescription, newDueDate) => {
    try {
      await updateDoc(doc(firestore, 'tasks', taskId), { title: newTitle, description: newDescription, dueDate: newDueDate });
      alert('Task edited successfully!');
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const taskRef = doc(firestore, 'tasks', taskId);
      const taskSnapshot = await getDoc(taskRef);

      if (taskSnapshot.exists() && taskSnapshot.data().assignedTo === auth.currentUser.email) {
        await updateDoc(taskRef, { status: newStatus });
        alert('Task status updated successfully!');
      } else {
        console.error('Task not found or not assigned to the current user.');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "#f79f98";
      case "inProgress":
        return "#ffff9c";
      case "completed":
        return "#9eff9e";
      default:
        return "white";
    }
  };

  return (
    <div className='wrapper-tl'>
      <div className='tasklist' style={{ width: "96vw", padding: "2vh 2vw", backgroundColor: "white", borderStyle: "none none solid none", border: "1px solid " }}>
        <h2>Task List</h2>
        {tasks.length === 0 ? (
          <p>No tasks are assigned.</p>
        ) : (
          <table style={{ width: "100%", textAlign: "center" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Task Name</th>
                <th>Task Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id} style={{ backgroundColor: getStatusColor(task.status) }}>
                  <td style={{padding:"2vh 0"}}>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.dueDate}</td>
                  <td>
                    <select style={{backgroundColor:getStatusColor(task.status),border:"1px solid",width:"6vw",textAlign:"center",padding:"0.6vh 0"}} value={task.status} onChange={(e) => handleStatusChange(task.id, e.target.value)}>
                      <option style={{margin:"0.2vh 0"}} value="todo">To Do</option>
                      <option style={{margin:"0.2vh 0"}} value="inProgress">In Progress</option>
                      <option style={{margin:"0.2vh 0"}} value="completed">Completed</option>
                    </select>
                  </td>
                  <td style={{backgroundColor:"white",width:"20%"}}>
                    <button style={{ width: "4vw", marginLeft: "1vw" }} onClick={() => handleEdit(task.id, prompt('Enter new title:', task.title), prompt('Enter new description:', task.description), prompt("Enter new Due Date:", task.dueDate))}>
                      Edit
                    </button>
                    <button style={{ width: '4vw', marginLeft: "1vw" }} onClick={() => handleDelete(task.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TaskList;
