import { useState, useEffect, createContext } from "react";
import {
  addNotes,
  addSubject,
  addTopic,
  getAllData,
  editNotesDB,
  deleteNotes,
  deleteTopic,
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
    // if (res) {
    //   setSub((prevState) => ({
    //     ...prevState,
    //     notes: [res, ...prevState.notes],
    //   }));
    // }
    if (res) {
      const now = await getAllData();
      setSub(now);
    }
    return res;
  };

  const editNotes = async (notes_id, title, notes) => {
    const res = await editNotesDB(notes_id, title, notes);
    return res;
  };

  const delNotes = async (notes_id) => {
    const res = await deleteNotes(notes_id);
    // setSub((prevState) => ({
    //   ...prevState,
    //   notes: prevState.notes.filter((note) => note.notes_id !== notes_id),
    // }));
    if (!res) {
      const now = await getAllData();
      setSub(now);
    }
    return res;
  };

  const delTopics = async (topic_id) => {
    const res = await deleteTopic(topic_id);
    setSub((prevState) => ({
      ...prevState,
      notes: prevState.notes.filter((note) => note.topic_id !== topic_id),
      topics: prevState.topics.filter((topic) => topic.topic_id !== topic_id),
    }));
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
      value={{
        sub,
        setSub,
        addNewSubject,
        addNewTopic,
        editNotes,
        addNote,
        delNotes,
        delTopics,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export default SubjectContext;
