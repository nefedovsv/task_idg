import React from "react";
import { useAuth0 } from "../utils/react-auth0-spa";
import { Link } from "react-router-dom";
import { Button } from "antd";
import styles from "../index.module.css";

export const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <Button
          onClick={() => {
            loginWithRedirect({});
          }}
        >
          Log in
        </Button>
      )}

      {isAuthenticated && (
        <Button
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Log out
        </Button>
      )}

      {isAuthenticated && (
        <span>
          <Link className={styles.navbar} to="/home">
            Home
          </Link>
          &nbsp;
          <Link to="/favourite">Favourite</Link>
        </span>
      )}
    </div>
  );
};
