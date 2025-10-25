import React, { useState } from 'react';
//import { loginUser } from '../services/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

   //alert(form.email+":"+form.password);
    const booknest = form;

  try {
      const response = await fetch("http://localhost:4000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(booknest)
      });

      const message = await response.text();
      alert(message);

      // ✅ navigate only if login is successful
      if (message.toLowerCase().includes("success")) {
        navigate("/booklist"); // ✅ go to /booklist after login
      }

    } catch (err) {
      console.error("Error:", err);
      alert("Submission failed.");
    }
  };


  return (
    <div  className="form-container">
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
      <div className="form-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <span> | </span>
          <Link to="/register">Register</Link>
          
        </div>
      


  
    </form>
    </div>
  );
};

export default Login;
