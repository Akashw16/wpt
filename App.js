import React, { useState } from 'react';
import Login from './Login';
import CourseTable from './CourseTable';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMessage, setUserMessage] = useState('');

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserMessage('Logged out successfully.');
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} setUserMessage={setUserMessage} />
      ) : (
        <CourseTable onLogout={handleLogout} setUserMessage={setUserMessage} />
      )}
      {userMessage && <p className="message">{userMessage}</p>}
    </div>
  );
}

export default App;
