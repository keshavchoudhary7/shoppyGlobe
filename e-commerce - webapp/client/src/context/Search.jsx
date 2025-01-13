import { useState, useContext, createContext } from "react";


const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: null,
    resullts: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

// use hook 

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };