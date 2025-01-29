import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AddUser.module.css';

const AddUserForm = ({ fetchUsers, setUsers, users, editUser, setEditUser, setShowAddUserForm }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    website: "",
  });

    const navigate = useNavigate();

  useEffect(() => {
    if (editUser) {
      setFormData({
        firstName: editUser.name?.split(" ")[0] || "",
        lastName: editUser.name?.split(" ")[1] || "",
        email: editUser.email || "",
        website: editUser.website|| "",
      });
    }
  }, [editUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.website) {
      alert("All fields are required!");
      return;
    }

    const updatedUser = {
      id: editUser ? editUser.id : users.length + 1,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      website: formData.website ,
    };
      
      console.log("updated user", updatedUser)

    if (editUser) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editUser.id}`, {
          method: "PUT",
          body: JSON.stringify(updatedUser),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === editUser.id ? updatedUser : user))
          );
          setEditUser(null);
          setShowAddUserForm(false);
            navigate('/');
          alert("User updated successfully!");
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
          method: "POST",
          body: JSON.stringify(updatedUser),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const newUser = await response.json();
          setUsers((prevUsers) => [...prevUsers, { ...newUser, id: users.length + 1 }]);
          setShowAddUserForm(false);
            navigate('/');
          alert("User added successfully!");
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div className={styles.inputGroup}>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div className={styles.inputGroup}>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className={styles.inputGroup}>
        <label>Department:</label>
        <input type="text" name="website" value={formData.website} onChange={handleChange} required />
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>Add User</button>
        <button type="button" className={styles.cancelButton} onClick={() => navigate('/')}>Cancel</button>
      </div>
    </form>
  );
};

export default AddUserForm;
