import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const BASE_URL = 'https://api-deploy-wham.onrender.com';

export default function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        setErrorMessage('Error fetching user');
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/show-favorites/${userId}`);
        setFavorites(response.data.favorites);
      } catch (error) {
        setErrorMessage('Error fetching favorites');
      }
    };

    fetchUser();
    fetchFavorites();
  }, [userId]);

  const handleUsernameChange = async () => {
    try {
      const response = await axios.put(`${BASE_URL}/change-username/${userId}`, { new_username: newUsername });
      setMessage(response.data);
    } catch (error) {
      setMessage('Failed to change username');
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${userId}`);
      setMessage(response.data);
    } catch (error) {
      setMessage('Failed to delete user');
    }
  };

  const handleRemoveFromFavorites = async (productId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/remove-from-favorites/${userId}/${productId}`);
      setMessage(response.data.message);
      const updatedFavorites = favorites.filter((fav) => fav.id !== productId);
      setFavorites(updatedFavorites);
    } catch (error) {
      setMessage('Failed to remove from favorites');
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
      <Header userId={userId} />
      </div>
     <div>
    <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="border p-6 rounded-md shadow-md w-full max-w-3xl">
    <h2 className='text-3xl mb-4'>{user.username}'s Profile</h2>
    <p>ID: {user.id}</p>
    <p>Username: {user.username}</p>
    
    <div className="mb-4">
      <h3 className="mb-2">Change Username</h3>
      <input
        type="text"
        placeholder="New Username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        className="border p-2 rounded-md"
      />
      <button 
        onClick={handleUsernameChange}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md mt-2"
      >
        Change Username
      </button>
    </div>
    
    <div className="mb-4">
      <h3 className="mb-2">Delete Profile</h3>
      <button 
        onClick={handleDeleteUser}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md"
      >
        Delete Profile
      </button>
    </div>

    <div className="mb-4">
      <h3 className="mb-2">Favorite Products</h3>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id} className="mb-4 border-b pb-4">
            <h4 className="text-xl mb-2">{favorite.name}</h4>
            <p className="text-base mb-2">Description: {favorite.description}</p>
            <button 
              onClick={() => handleRemoveFromFavorites(favorite.id)}
              className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md"
            >
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
    
    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    {message && <p>{message}</p>}
    </div>
</div>

     </div>
    </div>
  );
}