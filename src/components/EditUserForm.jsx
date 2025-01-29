import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/EditUserForm.module.css";

function EditUserForm({ users, setUsers }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        if (!response.ok) {
          throw new Error('User not found');
        }

        const userData = await response.json();

        if (userData && userData.name) {
          const nameParts = userData.name.split(' ');
          setFirstName(nameParts[0] || '');
          setLastName(nameParts.slice(1).join(' ') || '');
          setEmail(userData.email);
          setWebsite(userData.website || '');
            setError('');
        } else {
          throw new Error('Invalid user data');
        }
      } catch (error) {
        console.error('Error fetching user data for edit:', error);

        const userFromState = users.find(user => user.id === parseInt(id));

        if (userFromState) {
          setFirstName(userFromState.name.split(' ')[0] || '');
          setLastName(userFromState.name.split(' ').slice(1).join(' ') || '');
          setEmail(userFromState.email || '');
          setWebsite(userFromState.website || '');
            setError('');
        } else {
          setError('User not found');
        }
      }
    };
    
    fetchUserData();
  }, [id, users]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !website.trim()) {
      alert("All fields are required!");
      return;
    }

    const updatedUser = {
      name: `${firstName} ${lastName}`,
      email,
      website,
    };

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === parseInt(id) ? { ...user, ...updatedUser } : user
      )
    );

    alert("User updated successfully!");
      navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
          {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.inputGroup}>
        <label>First Name:</label>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Last Name:</label>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Department:</label>
        <input
          type="text"
          placeholder="Department"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          required
        />
      </div>
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>Update</button>
        <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
      </div>
    </form>
  );
}

export default EditUserForm;
