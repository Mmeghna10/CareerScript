/* eslint-disable react-refresh/only-export-components */
// src/context/userContext.js

import React, { createContext, useState, useEffect} from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check for an existing token and fetch the profile if present
  useEffect(() => {
    if (user) return;
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      // No token → not logged in
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
   
  }, [user]);

  // Called after a successful login/register to store token + user data
  const updateUser = (userData) => {
   setUser(userData);
   localStorage.setItem("token", userData.token)
    setLoading(false);
  };

  // Called on logout or any auth error to clear state
  const clearUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    // setLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
