import { db } from "../firebase.config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import uuid from "react-uuid";

const subjectRef = collection(db, "subjects");
const topicRef = collection(db, 'topics');
const notesRef = collection(db, 'notes');

const addSubject = async (name) => {
  const data = {
    subject_id: uuid(),
    name,
  };
  const res = await addDoc(subjectRef, data);
  if (res) return data;
  else return undefined;
};

const addTopic = async (name, subjectId) => {
  const data = {
    topic_id: uuid(),
    name,
    subject_id : subjectId
  }
  const res = await addDoc(topicRef, data);
  if (res) return data;
  else return undefined;

}

const getAllData = async () => {
  const subjectData = await getDocs(subjectRef);
  const finalData = {};
  finalData.subjects = subjectData.docs.map(doc => doc.data());
  const topicsData = await getDocs(topicRef);
  finalData.topics = topicsData.docs.map(doc => doc.data());
  const notesData = await getDocs(topicRef);
  finalData.notes = notesData.docs.map(doc => doc.data());
  return finalData;
}

export { addSubject, addTopic, getAllData };
