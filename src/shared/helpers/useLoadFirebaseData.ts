import { useEffect, useState } from "react";
import {
  query,
  collection,
  onSnapshot,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "../network/firebase";

const useLoadFirebaseData = <T>(
  dbName: string,
  limitData = 20,
  page = 1
): T[] => {
  const [data, setData] = useState<T[]>([]);
  const shownData = page * limitData;

  useEffect(() => {
    const dbCollection = collection(db, dbName);
    const q = query(dbCollection, limit(shownData), orderBy("order"));

    onSnapshot(q, (snapshot) => {
      const response = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
      setData(response);
    });
  }, [dbName, shownData]);

  return data;
};

export default useLoadFirebaseData;
