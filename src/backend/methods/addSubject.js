import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";

const collectionRef = collection(db, "subjects");

const addSubjects = async (name) => {
  const res = await addDoc(collectionRef, { name });
  return res;
};

export { addSubjects };
