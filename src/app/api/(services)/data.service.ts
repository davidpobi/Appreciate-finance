import "server-only";

import { getFirestore } from "firebase-admin/firestore";

export const getLogo = async () => {
  const firestore = getFirestore();
  const dataSnapshot = await firestore.collection("profile").doc("logo").get();
  const data = dataSnapshot.data() as { url: string } | undefined;
  if (!dataSnapshot.exists || !data) {
    return null;
  }
  return data.url;
};
