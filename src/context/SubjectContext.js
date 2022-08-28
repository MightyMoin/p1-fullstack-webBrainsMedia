import { useState, useEffect, createContext } from "react";
import { addSubject, addTopic, getAllData } from "../backend/methods/dbQueries";

const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const [sub, setSub] = useState(null);

  const addNewSubject = async (name) => {
    const res = await addSubject(name);
    if (res) {
      setSub((prevState) => ({
        ...prevState,
        subjects: [res, ...prevState.subjects],
      }));
    }
    return res;
  };

  const addNewTopic = async (name, subject_id) => {
    const res = await addTopic(name, subject_id);
    if (res) {
      setSub((prevState) => ({
        ...prevState,
        topics: [res, ...prevState.topics],
      }));
    }
    return res;
  };

  useEffect(() => {
    const mainData = async () => {
      const res = await getAllData();
      setSub(res);
    };
    mainData();
  }, []);

  return (
    <SubjectContext.Provider
      value={{ sub, setSub, addNewSubject, addNewTopic }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export default SubjectContext;
