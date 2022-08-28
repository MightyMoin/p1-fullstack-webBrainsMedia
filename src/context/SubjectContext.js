import { useState, useEffect, createContext } from "react";
import { getAllData } from "../backend/methods/dbQueries";


const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const [sub, setSub] = useState(null);

  useEffect( () => {
    const mainData = async () => {
        const res = await getAllData();
        setSub(res);
    }
    mainData();
  }, [])

  return (
    <SubjectContext.Provider value={{ sub, setSub }}>
      {children}
    </SubjectContext.Provider>
  );
};

export default SubjectContext;
