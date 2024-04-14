import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from '../App';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function Login({setIsLoggedIn}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const fetchUserId = async (username) => {
    try {
      const response = await axios.get(`${BASE_URL}/user?username=${username}`);
      return response.data.id;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      throw new Error("Failed to fetch user ID");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const loginResponse = await axios.post(`${BASE_URL}/login`, { username, password });
      const userId = await fetchUserId(username);
      if (loginResponse.status === 200) {
        setErrorMessage("");
        console.log('logged in')
        navigate(`/home/${userId}`);
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      setErrorMessage("Invalid username or password");
      console.error("Error logging in:", error);
    }
  };

  return (
<div className="relative flex w-80 flex-col rounded-xl bg-white text-gray-700 shadow-md">
  <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600"></div>
  <div className="p-6">
    <h5 className="mb-2 block text-xl font-semibold leading-snug text-blue-gray-900 antialiased">
      Login
    </h5>
    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
  </div>
  <div className="p-6 pt-0">
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <button 
        type="submit" 
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Login
      </button>
    </form>
  </div>
</div>

  );
  Login.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
  };
}
