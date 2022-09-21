import { createContext, useState } from 'react';

export const ConnectionsContext = createContext({
  connections: [
    ['les', 'jez'],
    ['jez', 'den'],
    ['les', 'kaye'],
    ['kaye', 'lyn'],
    ['lyn', 'den'],
  ],
  setConnections: () => [],
});

export const ConnectionsProvider = ({ children }) => {
  const [connections, setConnections] = useState([
    ['les', 'jez'],
    ['jez', 'den'],
    ['les', 'kaye'],
    ['kaye', 'lyn'],
    ['lyn', 'den'],
  ]);
  const value = { connections, setConnections };

  return (
    <ConnectionsContext.Provider value={value}>
      {children}
    </ConnectionsContext.Provider>
  );
};
