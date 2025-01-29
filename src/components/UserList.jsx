import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/UserList.module.css";
import EditUserForm from "./EditUserForm";

const UserList = ({ users, setUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleDelete = async (userId) => {
      setIsLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        alert("User deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
        setIsLoading(false);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.userListContainer}>
      <h2 className={styles.userListTitle}>User List</h2>

      <Link to="/add-user" className={styles.addUserButton}>
        <span className={styles.addUserIcon}>+</span> Add User
      </Link>

      {isLoading ? (
        <div className={styles.loader}>Loading...</div> // Loading spinner
      ) : users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name.split(" ")[0]}</td>
                  <td>{user.name.split(" ")[1]}</td>
                  <td>{user.email}</td>
                  <td>{user.website}</td>
                  <td className={styles.buttonGroup}>
                    <Link
                      to={`/edit-user/${user.id}`}
                      className={`${styles.editButton} ${styles.button}`}
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(user.id)}
                      className={`${styles.deleteButton} ${styles.button}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageClick(index + 1)}
                className={`${styles.pageButton} ${currentPage === index + 1 ? styles.active : ""}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => (indexOfLastUser < users.length ? prev + 1 : prev))}
              disabled={indexOfLastUser >= users.length}
              className={styles.pageButton}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
