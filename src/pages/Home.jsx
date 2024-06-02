import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import TaskList from '../Functions/TaskList';
import AssignTask from '../Functions/AssignTask';
import "./Home.css"

const Home = () => {
  const navigate = useNavigate();
  const [isAssignTaskOpen, setAssignTaskOpen] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      if (user && user.emailVerified) {
        // User is signed in and email is verified
      } else {
        // User is signed out or email is not verified
        navigate('/login'); // Redirect to login page
      }
    });

    return () => {
      // Cleanup subscription on component unmount
      unsubscribe();
    };
  }, [navigate]);

  const handleOpenAssignTask = () => {
    setAssignTaskOpen(true);
  };

  const handleCloseAssignTask = () => {
    setAssignTaskOpen(false);
  };

  const handleLogout = async () => {
    try {
      // Sign out the user
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div className='wrapper' style={{ position: "relative" }}>

      {user && user.emailVerified ? (
        <>
          <div className='navb'>
            <p>Welcome <span>{user.email}</span></p>
            <div className='btn'>
              <button style={{ borderRadius: "0", fontSize: "2vh", width: "10vw", cursor: "pointer" }} onClick={handleLogout}>Logout</button>
              <button style={{
                position: "absolute", bottom: "3.5vh", right: "3.5vh", width: "5vw",
                height: "5vw", cursor: "pointer"
              }} onClick={handleOpenAssignTask}>+</button>
            </div>
          </div>
          <TaskList />
          {isAssignTaskOpen && <AssignTask onClose={handleCloseAssignTask} />}
        </>
      ) : (
        <p>Please verify your email to access the Home page.</p>
      )}
    </div>
  );
};

export default Home;
