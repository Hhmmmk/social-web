import { createContext, useState } from 'react';

export const UserContext = createContext({
  userCollection: null,
  setUserCollection: () => null,
});

export const UserProvider = ({ children }) => {
  const [userCollection, setUserCollection] = useState(null);
  const value = { userCollection, setUserCollection };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
