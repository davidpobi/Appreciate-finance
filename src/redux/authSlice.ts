import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, RegisterPayload, ServicesOptions } from "../interfaces/auth";

export const defaultRegisterPayload: RegisterPayload = {
  personal: {
    name: "",
    email: "",
  },
  region: { region: "", subRegion: "" },
  types: "",
  tasks: "",
  expertise: {},
  cart: {},
  extraFields: {
    regularTips: false,
  },
};

const initialState: AuthState = {
  isAuthenticated: null,
  isOnboardingFlow: false,
  user: null,
  error: null,
  isLoading: false,
  isReset: false,
  currentServiceOption: ServicesOptions.HireALawyer,
  currentFlow: null,
  requiredFlows: [],
  registerPayload: defaultRegisterPayload,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentServiceOption: (state, action: PayloadAction<any>) => {
      return { ...state, currentServiceOption: action.payload.option };
    },
    setRequiredFlows: (state, action: PayloadAction<any>) => {
      // console.log(action.payload.flows);
      return { ...state, requiredFlows: [...action.payload.flows] };
    },
    setCurrentFlow: (state, action: PayloadAction<any>) => {
      console.log(action.payload.flow);
      return { ...state, currentFlow: action.payload.flow };
    },
    updateRegisterPayload: (state, action) => {
      const { name, value } = action.payload.data;

      console.log(`${name}:`, value);
      return { ...state, registerPayload: { ...state.registerPayload, [name]: value } };
    },
    setReset: (state, action) => {
      const val: boolean = action.payload.reset;
      if (val) {
        state.registerPayload = defaultRegisterPayload;
      }
      state.isReset = true;
    },
    setIsOnboarding: (state, action: PayloadAction<any>) => {
      return { ...state, isOnboardingFlow: action.payload.state };
    },
    setUser: (state, action) => {
      return { ...state, user: { ...action.payload.user } };
    },
    setIsAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state) => {
      state.error = null;
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isAuthenticated = false;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setCurrentServiceOption,
  setRequiredFlows,
  setCurrentFlow,
  updateRegisterPayload,
  setReset,
  setIsOnboarding,
  setUser,
  setIsAuthenticated,
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
} = authSlice.actions;
export default authSlice.reducer;
