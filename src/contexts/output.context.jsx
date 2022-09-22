import { createContext, useState } from 'react';

export const OutputContext = createContext({
  output: [],
});

export const OutputProvider = ({ children }) => {
  const [output, setOutput] = useState([]);
  const value = { output, setOutput };

  return (
    <OutputContext.Provider value={value}>{children}</OutputContext.Provider>
  );
};
