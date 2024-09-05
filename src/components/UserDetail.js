import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
      })
      .catch(err => setError('Failed to fetch user data'));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, { name, email, phone });
      alert('User updated successfully!');
    } catch (err) {
      setError('Failed to update user');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <input value={name} onChange={e => setName(e.target.value)} />
        <input value={email} onChange={e => setEmail(e.target.value)} />
        <input value={phone} onChange={e => setPhone(e.target.value)} />
        <button type="submit">Update User</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default UserDetail;
