import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const BASE_URL = 'https://api-deploy-wham.onrender.com';

export default function Home() {
  const { userId } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`);
        setUsername(response.data.username);
      } catch (error) {
        setErrorMessage('Error fetching username');
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        setErrorMessage('Error fetching categories');
      }
    };

    fetchUsername();
    fetchCategories();
  }, [userId]);

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`${BASE_URL}/categories/${categoryId}/products`);
      setProducts(response.data);
    } catch (error) {
      setErrorMessage('Error fetching products');
    }
  };

  const addToFavorites = async (productId) => {
    try {
      const response = await axios.post(`${BASE_URL}/add-to-favorites`, {
        user_id: userId,
        product_id: productId
      });
      alert(response.data.message);
    } catch (error) {
      setErrorMessage('Error adding product to favorites');
    }
  };

  return (
    <div>
      <Header userId={userId} />
      <div className="flex flex-col items-center justify-center min-h-screen">
  <div className="border p-6 rounded-md shadow-md w-full max-w-3xl">
    <h1 className='text-5xl mb-4'>Hi, {username || `User ${userId}`}!</h1>

    <h2 className='text-3xl mb-4'>Here Are Our Categories:</h2>
    <ul className="mb-4">
      {categories.map((category) => (
        <li 
          key={category.id} 
          onClick={() => {
            setSelectedCategory(category.id);
            fetchProductsByCategory(category.id);
          }}
          className="text-xl hover:text-blue-500 transition duration-300 ease-in-out cursor-pointer"
        >
          {category.name}
        </li>
      ))}
    </ul>
    
    <h2 className='mb-2'>Products</h2>
    <ul className="mb-4">
      {products.map((product) => (
        <li key={product.id} className="mb-4 border-b pb-4">
          <h3 className="text-2xl mb-2">{product.name}</h3>
          <p className="text-base mb-2">Description: {product.description}</p>
          <button 
            onClick={() => addToFavorites(product.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
          >
            Add to Favorites
          </button>
        </li>
      ))}
    </ul>

    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
  </div>
</div>


    </div>
  );
}
