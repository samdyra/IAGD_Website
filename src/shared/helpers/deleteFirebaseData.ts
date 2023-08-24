import toast from "react-hot-toast";
import { storage } from "../network/firebase";

import { deleteObject, ref } from "firebase/storage";

export const deleteFirebaseData = async (feature: string) => {
  try {
    const storageRef = ref(storage, feature);
    await deleteObject(storageRef);
    toast.success("Successfully delete data!");
  } catch (error) {
    toast.error("Somethign Went Wrong!");
  }
};
