import { createContext, useState } from 'react';

export const ConnectionsContext = createContext({
  connections: [],
  setConnections: () => [],
});

export const ConnectionsProvider = ({ children }) => {
  const [connections, setConnections] = useState([]);
  const value = { connections, setConnections };

  return (
    <ConnectionsContext.Provider value={value}>
      {children}
    </ConnectionsContext.Provider>
  );
};
