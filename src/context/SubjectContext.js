import { useState, useEffect, createContext } from "react";
import {
  addNotes,
  addSubject,
  addTopic,
  getAllData,
  editNotesDB,
} from "../backend/methods/dbQueries";

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

  const addNote = async (title, notes, subject_id, topic_id) => {
    const res = await addNotes(title, notes, subject_id, topic_id);
    if (res) {
      setSub((prevState) => ({
        ...prevState,
        notes: [res, ...prevState.notes],
      }));
    }
    return res;
  };

  const editNotes = async (notes_id, title, notes) => {
    const res = await editNotesDB(notes_id, title, notes);
    console.log(res);
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
      value={{ sub, setSub, addNewSubject, addNewTopic, editNotes, addNote }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export default SubjectContext;
