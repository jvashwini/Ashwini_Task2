import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", formData);
      alert(res.data.msg);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Error registering");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-300">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full mb-3 rounded" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-3 rounded" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-3 rounded" />
        <button className="bg-blue-500 text-white py-2 w-full rounded hover:bg-blue-600">Register</button>
      </form>
    </div>
  );
};

export default Register;
