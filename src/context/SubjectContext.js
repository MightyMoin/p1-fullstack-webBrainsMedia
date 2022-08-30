import { useState, useEffect, createContext } from "react";
import {
  addNotes,
  addSubject,
  addTopic,
  getAllData,
  editNotesDB,
  deleteNotes,
  deleteTopic,
  editSubject,
  editTopic,
  deleteSubject,
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
        notes: [...prevState.notes, res],
      }));
    }
    return res;
  };

  const editNotes = async (notes_id, title, notes) => {
    const res = await editNotesDB(notes_id, title, notes);
    return res;
  };

  const editSub = async (subject_id, name) => {
    const res = await editSubject(subject_id, name);

    if (!res) {
      const data = await getAllData();
      setSub(data);
    }
    return res;
  };

  const editTop = async (topic_id, name) => {
    const res = await editTopic(topic_id, name);
    if (!res) {
      const data = await getAllData();
      setSub(data);
    }
    return res;
  };

  const delNotes = async (notes_id) => {
    const res = await deleteNotes(notes_id);
    setSub((prevState) => ({
      ...prevState,
      notes: prevState.notes.filter((note) => note.notes_id !== notes_id),
    }));
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

  const deleteSub = async (subject_id) => {
    const res = await deleteSubject(subject_id);
    setSub((prevState) => ({
      ...prevState,
      subjects: prevState.subjects.filter(
        (sub) => sub.subject_id !== subject_id
      ),
      notes: prevState.notes.filter((note) => note.subject_id !== subject_id),
      topics: prevState.topics.filter(
        (topic) => topic.subject_id !== subject_id
      ),
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
        editSub,
        editTop,
        deleteSub,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export default SubjectContext;
