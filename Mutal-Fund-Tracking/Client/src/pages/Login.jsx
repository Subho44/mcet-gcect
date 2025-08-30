import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const hc = e => setForm({ ...form, [e.target.name]: e.target.value });
  const hs = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5800/api/user/login', form);
    localStorage.setItem('token', res.data.token);
    navigate('/service');
  }
  return <>
    <form onSubmit={hs}>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={hc} />
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" name='password' onChange={hc} />
      </div>

      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </>
}

export default Login