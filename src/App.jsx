import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import AddUserForm from './components/ AddUserForm.jsx';
import UserList from './components/UserList';
import EditUserForm from './components/EditUserForm.jsx';
import styles from "./App.module.css"

const App = () => {
  const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    
    const [showAddUserForm, setShowAddUserForm] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUserClick = (user) => {
    setEditUser(user);
  };

  const handleAddUserClick = () => {
    setEditUser(null);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1 className={styles.header}>User Management Dashboard</h1>
       
          <UserList
            users={users}
            setUsers={setUsers}
            fetchUsers={fetchUsers}
            handleEditUserClick={handleEditUserClick}
          />
        </div>
      ),
    },
    {
      path: "/add-user",
      element: (
        <div>
              <h1 className={styles.header}>Add User</h1>
          <AddUserForm
            fetchUsers={fetchUsers}
            setUsers={setUsers}
            users={users}
            editUser={editUser}
            setEditUser={setEditUser}
                  setShowAddUserForm={setShowAddUserForm}
            isEditMode={editUser !== null}
          />
        </div>
      ),
    },
   {
    path: "/edit-user/:id",
    element: (
      <div>
         <h1 className={styles.header}>Edit User</h1>
        <EditUserForm
          fetchUsers={fetchUsers}
          setUsers={setUsers}
          users={users}
                editUser={editUser}
          setEditUser={setEditUser}
          setShowAddUserForm={setShowAddUserForm}
          isEditMode={editUser !== null}
        />
      </div>
    ),
  }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
