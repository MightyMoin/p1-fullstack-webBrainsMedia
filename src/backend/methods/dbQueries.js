import { db } from "../firebase.config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import uuid from "react-uuid";
import { RedoTwoTone } from "@mui/icons-material";

const subjectRef = collection(db, "subjects");
const topicRef = collection(db, "topics");
const notesRef = collection(db, "notes");

const addSubject = async (name) => {
  const data = {
    name,
  };
  const res = await addDoc(subjectRef, data);
  if (res) {
    data.subject_id = res.id;
    return data;
  } else return undefined;
};

const addTopic = async (name, subjectId) => {
  const data = {
    name,
    subject_id: subjectId,
  };
  const res = await addDoc(topicRef, data);
  if (res) {
    data.topic_id = res.id;
    return data;
  } else return undefined;
};

const addNotes = async (title, notes, subject_id, topic_id) => {
  const data = {
    title,
    subject_id,
    topic_id,
    notes,
  };
  const res = await addDoc(notesRef, data);
  if (res) {
    data.notes_id = res.id;
    return data;
  } else return undefined;
};

const editNotesDB = async (notes_id, title, notes) => {
  console.log(notes_id, title, notes);
  const presRef = doc(db, "notes", notes_id);
  const res = await updateDoc(presRef, { title, notes });
  return res;
};

const getAllData = async () => {
  const subjectData = await getDocs(subjectRef);
  const finalData = {};
  finalData.subjects = subjectData.docs.map((doc) => ({
    ...doc.data(),
    subject_id: doc.id,
  }));
  const topicsData = await getDocs(topicRef);
  finalData.topics = topicsData.docs.map((doc) => ({
    ...doc.data(),
    topic_id: doc.id,
  }));
  const notesData = await getDocs(notesRef);
  finalData.notes = notesData.docs.map((doc) => ({
    ...doc.data(),
    notes_id: doc.id,
  }));
  return finalData;
};

export { addSubject, addTopic, getAllData, addNotes, editNotesDB };
