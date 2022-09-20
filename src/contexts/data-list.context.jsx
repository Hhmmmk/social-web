import { createContext, useState } from 'react';

export const DataListContext = createContext({
  dataList: [],
  setDataList: () => [],
});

export const DataListProvider = ({ children }) => {
  const [dataList, setDataList] = useState([]);
  const value = { dataList, setDataList };

  return (
    <DataListContext.Provider value={value}>
      {children}
    </DataListContext.Provider>
  );
};
