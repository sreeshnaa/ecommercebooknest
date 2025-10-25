
import React, { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '',contact: '',address: '',pincode: ''});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const booknest = form;

 try {
      const response = await fetch("http://localhost:4000/testing", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(booknest)
      });

      const message = await response.text();
      alert(message);
    } catch (err) {
      console.error("Error:", err);
      alert("Submission failed.");
    }
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} required /><br></br>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br></br>
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br></br>
      <input name="contact" type="tel" placeholder="Contact Number" onChange={handleChange} required /><br></br>
      <input name="address" placeholder="Address" onChange={handleChange} required/><br></br>
      <input name="pincode" type="text" placeholder="Pincode" onChange={handleChange} required /><br></br>
      <button type="submit">Register</button>
    </form>
    </div>
  );
};

export default Register;
