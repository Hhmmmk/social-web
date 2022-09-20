import { createContext, useState } from 'react';

export const UserContext = createContext({
  userCollection: [],
  setUserCollection: () => [],
});

export const UserProvider = ({ children }) => {
  const [userCollection, setUserCollection] = useState([]);
  const value = { userCollection, setUserCollection };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
