import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

export default function Landing() {
  const [displayLogin, setDisplayLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8 rounded shadow-md">
      <div className="bg-white p-8 rounded flex flex-col items-center justify-center">
        <div>
          {displayLogin ? <Login /> : <Signup />}
        </div>
        <div className="mt-4 space-x-4 flex">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
            onClick={() => setDisplayLogin(true)}
          >
            Login
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
            onClick={() => setDisplayLogin(false)}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}



