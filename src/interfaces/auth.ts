export enum ServicesOptions {
  HireALawyer = "HIL",
  DIY = "DIY",
  Subscribe = "SUBSCIBE",
}

export enum AuthFlowsClients {
  REGION = "REGION",
  TYPE = "TYPE",
  TASKS = "TASKS",
  PERSONAL = "PERSONAL",
  EXPERTISE = "EXPERTISE",
  CART = "CART",
}

export enum AuthFlowsStaff {
  REGION = "REGION",
  QUALIFICATION = "QUALIFICATION",
  AVAILABILITY = "AVAILABILITY",
  PERSONAL = "PERSONAL",
}

export interface IPersonal {
  name: string;
  email: string;
  country?: string;
  password?: string;
  confirmPassword?: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  country?: string;
  password?: string;
  confirmPassword?: string;
  termsAndConditions?: boolean | null;
}

export interface ExtraFields {
  regularTips: boolean;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  state: boolean;
  data: any;
  message?: string;
}

export interface RegisterPayload {
  personal?: IPersonal;
  region?: { region: string; subRegion: string };
  types?: string;
  tasks?: string;
  expertise?: any;
  cart?: any;
  extraFields?: ExtraFields;
}

export interface RegisterResponse {
  success: boolean;
  data: any;
  message?: string;
}

export interface AuthState {
  isAuthenticated: boolean | null;
  isOnboardingFlow: boolean | null;
  user: any | null;
  error: Error | null;
  isLoading: boolean;
  isReset: boolean;
  currentServiceOption: ServicesOptions;
  currentFlow: any;
  requiredFlows: Array<any>;
  registerPayload: RegisterPayload | null;
}

export enum AccountVerificationStates {
  Confirmed = "Confirmed",
  ConfirmedAlready = "ConfirmedAlready",
  Failed = "Failed",
  LimitReached = "LimitReached",
}

export enum SendVerificationStates {
  Sent = "Sent",
  ConfirmedAlready = "ConfirmedAlready",
  InvalidUser = "InvalidUser",
  Failed = "Failed",
  LimitReached = "LimitReached",
}
