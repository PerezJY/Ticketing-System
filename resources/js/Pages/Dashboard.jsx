import React, { useEffect, useState } from 'react';
import api from '../axios';


const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/user');
        setUser(res.data);
      } catch (error) {
        alert('Not authenticated');
      }
    };

    fetchUser();
  }, []);

  return user ? (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Dashboard;
