"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setIsOnboarding } from "../redux/authSlice";

const RouteGuard = ({ children }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user: any = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {}, [isAuthenticated, user]);

  useEffect(() => {}, [pathname]);

  return <>{children}</>;
};

export default RouteGuard;
