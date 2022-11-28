import React, { createContext,useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const initialSearchState={
    query:"",
    type:"All",
    by:"Popularity",
    time:"AllTime",
    page:0
  } 

  const [searchState,setSearchState] = useState(initialSearchState); 

  const data = [searchState,setSearchState];

  return <SearchContext.Provider value={data}>{children}</SearchContext.Provider>;
};