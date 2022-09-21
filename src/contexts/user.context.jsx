import { createContext, useState } from 'react';

export const UserContext = createContext({
  userCollection: [
    {
      id: '1',
      userName: 'Les',
    },
    {
      id: '2',
      userName: 'Jez',
    },
    {
      id: '3',
      userName: 'Den',
    },
    {
      id: '4',
      userName: 'Kaye',
    },
    {
      id: '5',
      userName: 'Lyn',
    },
  ],
  setUserCollection: () => [],
});

export const UserProvider = ({ children }) => {
  const [userCollection, setUserCollection] = useState([
    {
      id: '1',
      userName: 'Les',
    },
    {
      id: '2',
      userName: 'Jez',
    },
    {
      id: '3',
      userName: 'Den',
    },
    {
      id: '4',
      userName: 'Kaye',
    },
    {
      id: '5',
      userName: 'Lyn',
    },
  ]);
  const value = { userCollection, setUserCollection };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
