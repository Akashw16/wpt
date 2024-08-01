import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLoginSuccess, setUserMessage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response.data.success) {
        setUserMessage('Login successful.');
        onLoginSuccess();
      } else {
        setUserMessage(response.data.message);
      }
    } catch (error) {
      setUserMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
