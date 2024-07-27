import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { IActivity } from "../interfaces/user";

export const getUserActivity = async (userID: string): Promise<{ success: boolean; data: IActivity[] | null }> => {
  let result: { success: boolean; data: IActivity[] } = { success: false, data: [] };

  try {
    const activitiesRef = collection(firestore, `users/${userID}/activities`);
    const q = query(activitiesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const activities: IActivity[] = [];
    querySnapshot.forEach((doc) => {
      activities.push(doc.data() as IActivity);
    });

    result.success = true;
    result.data = activities || [];
  } catch (err) {
    console.error("Error getting user activities: ", err);
  }

  return result;
};

export const updateUserActivity = async (
  userID: string,
  activityData: IActivity
): Promise<{ success: boolean; data: IActivity | null }> => {
  let result: { success: boolean; data: IActivity | null } = { success: false, data: null };

  try {
    const activitiesRef = collection(firestore, `users/${userID}/activities`);
    await addDoc(activitiesRef, activityData);

    result.success = true;
    result.data = activityData;
  } catch (err) {
    console.error("Error updating user activity: ", err);
  }

  return result;
};
