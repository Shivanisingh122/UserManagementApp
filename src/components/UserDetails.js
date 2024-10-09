import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from './ui/button';
import axios from 'axios';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
      <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
      <Button as={Link} to="/" variant="outline">Back to User List</Button>
    </div>
  );
};

export default UserDetails;