import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    setUsers(response.data);
  };

  const createUser = async (user) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
    setUsers([...users, response.data]);
  };

  const updateUser = async (user) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
    setUsers(users.map(u => (u.id === user.id ? response.data : u)));
    setIsEditing(false);
  };

  const deleteUser = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditing(true);
  };

  const handleFormSubmit = (user) => {
    if (isEditing) {
      updateUser(user);
    } else {
      createUser(user);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      {isEditing ? (
        <UserForm user={editingUser} onSubmit={handleFormSubmit} closeForm={() => setIsEditing(false)} />
      ) : (
        <button onClick={() => setIsEditing(true)}>Create User</button>
      )}
      <UserTable users={users} onEdit={handleEdit} onDelete={deleteUser} />
    </div>
  );
};

export default HomePage;
