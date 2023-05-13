import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function getUserInfo(id: string) {
  const ref = doc(db, "users", id);

  return await getDoc(ref).then((doc) => {
    return doc.data();
  });
}
