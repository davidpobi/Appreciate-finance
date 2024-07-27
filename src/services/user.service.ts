import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { IProfile } from "../interfaces/user";

export const createUserProfile = async (userId: string, profileData: IProfile): Promise<boolean> => {
  try {
    await setDoc(doc(firestore, "users", userId), profileData, { merge: true });
    return true;
  } catch (error) {
    console.error("Error saving user profile: ", error);
    return false;
  }
};

export const updateUserProfile = async (userId: string, profileData: Partial<IProfile>): Promise<boolean> => {
  try {
    const userDocRef = doc(firestore, "users", userId);
    await updateDoc(userDocRef, profileData);
    return true;
  } catch (error) {
    console.error("Error updating user profile: ", error);
    return false;
  }
};

export const getUserProfile = async (userId: string): Promise<IProfile | null> => {
  try {
    const userDocRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data() as IProfile;
    } else {
      console.error("No such user profile!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile: ", error);
    return null;
  }
};

export const updateSettings = async (userId: string, newSettings: Partial<IProfile["settings"]>): Promise<boolean> => {
  try {
    const existingProfile = await getUserProfile(userId);
    if (existingProfile) {
      const updatedSettings = {
        ...existingProfile.settings,
        ...newSettings,
      };

      const userDocRef = doc(firestore, "users", userId);
      await updateDoc(userDocRef, { settings: updatedSettings, updatedAt: new Date().toISOString() });
      return true;
    } else {
      console.error("No such user profile!");
      return false;
    }
  } catch (error) {
    console.error("Error updating settings: ", error);
    return false;
  }
};
