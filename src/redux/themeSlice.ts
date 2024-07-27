import { createSlice } from "@reduxjs/toolkit";
import { Themes } from "../interfaces/theme";
import { updateSettings, updateUserProfile } from "../services/user.service";

const storeSelectedTheme = async (theme: Themes, uid?: string | null) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("selectedTheme", theme);
  }
  if (uid === null || uid === undefined) {
    return;
  }
  await updateSettings(uid, { theme: theme });
};

export const getSelectedTheme = () => {
  if (typeof window !== "undefined") {
    const theme_ = localStorage.getItem("selectedTheme");
    return theme_;
  }
};

const initialState = {
  selectedTheme: getSelectedTheme() || Themes.dark,
} as any;

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state, action) {
      const newTheme = action.payload.selectedTheme;
      const uid = action.payload.uid || null;
      storeSelectedTheme(newTheme, uid);
      return { ...state, selectedTheme: newTheme };
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
