import React, { useState } from 'react';

const UserForm = ({ user, onSubmit, closeForm }) => {
  const [formData, setFormData] = useState(user || { name: '', email: '', phone: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Phone:
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
      </label>
      <button type="submit">Submit</button>
      <button type="button" onClick={closeForm}>Cancel</button>
    </form>
  );
};

export default UserForm;
