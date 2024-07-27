"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess, setUser } from "../redux/authSlice";
import { getCurrentAuthenticatedUser } from "../services/auth.services";
import { IProfile, OnboardingStatus } from "../interfaces/user";
import { useRouter } from "next/navigation";
import { setLiveStatus } from "../redux/alpacaSlice";
import { TradingMode } from "../interfaces/alpaca";

const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleRoute = (route: string) => {
    router.push(`/${route}`);
  };

  useEffect(() => {
    const initialize = async () => {
      const user_: any = (await getCurrentAuthenticatedUser()) as IProfile;
      if (user_ !== null) {
        console.log("is Authenticated");
        // if (user_?.onboardingStatus !== OnboardingStatus.completed) {
        //   handleRoute("onboarding");
        //   return;
        // }
        const profile: IProfile = user_;
        const isLive = profile.settings?.tradingMode === TradingMode.live ? true : false;

        dispatch(setUser({ user: profile }));
        dispatch(setLiveStatus({ status: isLive }));
        dispatch(loginSuccess());

        return;
      }
      console.log("is Unauthenticated");
      dispatch(logoutSuccess());
    };

    initialize();
  }, []);
  return <>{children}</>;
};

export default AuthProvider;
