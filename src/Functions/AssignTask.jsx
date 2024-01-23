// import React, { useState } from 'react';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { firestore, auth } from '../firebase';

// const AssignTask = () => {
//   const [newTask, setNewTask] = useState('');
//   const [description, setDescription] = useState('');
//   const [assignTo, setAssignTo] = useState('');
// const [dueDate, setDueDate] = useState("")
// const [status, setStatus] = useState("todo")
// const assignedToUser = assignTo.trim() !== '' ? assignTo : auth.currentUser.email; 
//   // const handleAssignNewTask = async () => {
//   //   try {
//   //     const newTaskDocRef = await addDoc(collection(firestore, 'tasks'), {
//   //       title: newTask,
//   //       description,
//   //       dueDate,
//   //       status, // Default status
//   //       assignedTo: auth.currentUser.email,
//   //       assignedBy: auth.currentUser.email,
//   //       createdAt: serverTimestamp(),
//   //       completed: false,
//   //     });
  
//   //     console.log('Task assigned successfully!', newTaskDocRef.id);
//   //   } catch (error) {
//   //     console.error('Error assigning task:', error);
//   //   }
//   // };
  
//   const handleAssignTaskToOther = async () => {
//     try {
//       // Add a new task assigned to another user
//       const newTaskDocRef = await addDoc(collection(firestore, 'tasks'), {
//         title: newTask,
//         description,
//         dueDate,
//         status,
//         assignedTo: assignedToUser, // Assigning to the specified user
//         assignedBy: auth.currentUser.email,
//         createdAt: serverTimestamp(),
//         completed: false,
//       });

//       console.log('Task assigned successfully!', newTaskDocRef.id);
//     } catch (error) {
//       console.error('Error assigning task to other user:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Assign Task</h2>
//       <div>
//         <label>New Task:</label>
//         <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
//       </div>
//       <div>
//         <label>Description:</label>
//         <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
//       </div>
//       <div>
//         <label>Due Date:</label>
//         <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
//       </div>
   
//       <div>
//         <label>Assign Task to User (UID):</label>
//         <input type="text" value={assignTo} onChange={(e) => setAssignTo(e.target.value)} />
//         <button onClick={handleAssignTaskToOther}>Assign Task</button>
//       </div>
//     </div>
//   );
// };

// export default AssignTask;







import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore, auth } from '../firebase';

const AssignTask = ({ onClose }) => {
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('todo');
  const assignedToUser = assignTo.trim() !== '' ? assignTo : auth.currentUser.email;

  const handleAssignTaskToOther = async () => {
    try {
      const newTaskDocRef = await addDoc(collection(firestore, 'tasks'), {
        title: newTask,
        description,
        dueDate,
        status,
        assignedTo: assignedToUser,
        assignedBy: auth.currentUser.email,
        createdAt: serverTimestamp(),
        completed: false,
      });

      alert('Task assigned successfully!');
      onClose(); // Close the AssignTask popup
    } catch (error) {
      console.error('Error assigning task to other user:', error);
    }
  };

  return (
    <div className='assigntask' style={{position:"absolute",top:"3vh",backgroundColor:"white",width:"50vw",display:"flex",flexDirection:"column",padding:'2vh 1vh',boxShadow:"-6px 1px 29px -8px rgba(0, 0, 0, 0.5)",borderRadius:"20px",alignItems:"center"}}>
      <h2>Assign Task</h2>
      <div  className='at-f' style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"1vh",justifyContent:"center",width:"100%",borderStyle:"solid none none none", padding:"2vh 1vh"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"90%"}}>
          <label>New Task:</label>
          <input style={{border:"1px solid black",borderRadius:"0"}} type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"90%"}}>
          <label>Description:</label>
          <input style={{border:"1px solid black",borderRadius:"0"}} type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"90%"}}>
          <label>Due Date:</label>
          <input style={{border:"1px solid black",borderRadius:"0"}} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"90%"}}>
          <label>Assign Task to User (Email):</label>
          <input style={{border:"1px solid black",borderRadius:"0"}} type="text" value={assignTo} onChange={(e) => setAssignTo(e.target.value)} />
        </div>
          <div style={{display:"flex",gap:"1vw"}}>
            <button style={{width:"10vw"}} onClick={handleAssignTaskToOther}>Assign Task</button>
            <button style={{width:"10vw"}} onClick={onClose}>Close</button>
          </div>
      </div>
    </div>
  );
};

export default AssignTask;
