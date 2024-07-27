"use client";

import { Provider } from "react-redux";
import store from "../redux/store";
import React from "react";
import AuthProvider from "../AuthGuards/AuthProvider";
import AppLayout from "./app/AppLayout";

const AppContainer = ({ children }: any) => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <AuthProvider>
          <AppLayout>{children}</AppLayout>
        </AuthProvider>
      </Provider>
    </React.Fragment>
  );
};

export default AppContainer;
