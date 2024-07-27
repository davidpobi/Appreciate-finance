import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

import {
  AccountVerificationStates,
  IRegister,
  RegisterResponse,
  SendVerificationStates,
  SignInPayload,
  SignInResponse,
} from "../interfaces/auth";
import { updateUserActivity } from "./activity.services";
import { firebaseAuth } from "../config/firebase";
import { createUserProfile, getUserProfile } from "./user.service";
import { Activity, IActivity, IProfile, OnboardingStatus } from "../interfaces/user";

export const getCurrentAuthenticatedUser = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (user) => {
        unsubscribe();
        if (user) {
          const userProfile = await getUserProfile(user.uid);
          console.log("userProfile", userProfile);
          if (userProfile) {
            resolve(userProfile);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      },
      reject
    );
  });
};

export const registerNewCustomer = async (payload: IRegister | null): Promise<RegisterResponse> => {
  let result: RegisterResponse = { success: false, data: null, message: "" };
  if (payload === null) {
    return result;
  }

  try {
    if (!payload?.email || !payload?.confirmPassword) {
      return result;
    }

    const email = payload.email.trim();
    const password = payload.confirmPassword.trim();

    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const user = userCredential.user;
    console.log("user", user);
    const details: IProfile = {
      id: user.uid,
      email: email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      onboardingStatus: OnboardingStatus.completed,
    };

    console.log(details);
    await createUserProfile(user.uid, details);

    result.success = true;
    result.data = user;
  } catch (err: any) {
    console.log(err.message);
    let errorMessage: string = err.message;

    if (errorMessage.includes("auth/configuration-not-found")) {
      errorMessage = "Auth not setup";
    }

    if (errorMessage.includes("auth/email-already-in-use")) {
      errorMessage = "An account with this given email already exists";
    }

    result.success = false;
    result.message = errorMessage;
  }
  return result;
};

export const signInCustomer = async (payload: SignInPayload): Promise<SignInResponse> => {
  await signOut(firebaseAuth);
  let result: SignInResponse = { state: false, data: null, message: "" };

  try {
    if (!payload.email || !payload.password) {
      return result;
    }

    const email = payload.email.trim();
    const password = payload.password.trim();

    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const user = userCredential.user;

    result.state = true;
    result.data = (await getUserProfile(user.uid)) || null;

    if (user) {
      const loggedInActivity: IActivity = {
        uid: user.uid,
        type: Activity.loggedInAt,
        createdAt: new Date().toISOString(),
      };
      await updateUserActivity(user.uid, loggedInActivity);
    }
  } catch (err: any) {
    console.log(err.message);
    let errorMessage: string = err.message;

    if (errorMessage.includes("auth/invalid-login-credentials")) {
      errorMessage = "Invalid login credentials";
    }

    result.state = false;
    result.message = errorMessage;
  }
  return result;
};

export const SignOut = async () => {
  await signOut(firebaseAuth);
};
