"use client";

import AuthenticationNavBar from "../authentication/AuthenticationNavbar";
import AuthenticationFooter from "./AuthenticationFooter";

const AuthenticationLayout = ({ children }: any) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default AuthenticationLayout;
