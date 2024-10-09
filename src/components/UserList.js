import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import UserForm from './UserForm';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setIsOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    if (selectedUser) {
      try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, formData);
        setUsers(users.map(user => user.id === selectedUser.id ? response.data : user));
      } catch (error) {
        console.error('Error updating user:', error);
      }
    } else {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
        setUsers([...users, response.data]);
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
    setIsOpen(false);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Button onClick={handleCreate} className="mb-4">Create User</Button>
      <Input
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button as={Link} to={`/user/${user.id}`} variant="outline" className="mr-2">View</Button>
                <Button onClick={() => handleEdit(user)} variant="outline" className="mr-2">Edit</Button>
                <Button onClick={() => handleDelete(user.id)} variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UserForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedUser}
      />
    </div>
  );
};

export default UserList;