import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { AppDispatch } from '../../store';
import { login } from '../../store/authSlice';

const LoginForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/auth/login', { email, password });
      // handle successful login
      console.log(data);
      dispatch(login());
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;