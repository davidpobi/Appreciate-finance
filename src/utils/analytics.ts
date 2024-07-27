import { logEvent } from "firebase/analytics";
import { firebaseAnalytics } from "../config/firebase";
import { isDevelopment } from "./helpers";

export const logPageView = (page?: string) => {
  if (firebaseAnalytics && !isDevelopment()) {
    console.log("pageView");
    logEvent(firebaseAnalytics, "page_view", {
      page_title: page ? page : document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }
};
