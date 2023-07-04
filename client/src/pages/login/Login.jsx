import React, { useState } from 'react';
import './login.css';
import { generalRequest } from '../../httpService';
import Navbar from '../../components/navbar/Navbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // submit login function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await generalRequest.post('/auth/login', {
        username,
        password,
      });
      if (res.data) {
        // store data in localstorage
        localStorage.setItem('user', JSON.stringify(res.data));
        setTimeout(() => {
          // navigate to home page
          window.location.pathname = '/';
        }, 300);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <div>
      <Navbar />
      <div className='registerContainer'>
        <div className='regTitle'>Login</div>
        <div className='registerWrapper'>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type='text'
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            <label>Password</label>
            <input
              type='text'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <button type='submit'>Login</button>
          </form>
          {error && <div>Invalid Parameters!</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
