import React, { createContext, useState, useContext } from 'react';


const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null); 

  const login = (email) => {
    setUserEmail(email);
  };

  const logout = () => {
    setUserEmail(null); 
  };

  return (
    <UserContext.Provider value={{ userEmail, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  return useContext(UserContext);
};