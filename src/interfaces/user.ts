import { TradingMode } from "./alpaca";
import { Themes } from "./theme";

interface Address {
  country: string;
  state: string;
  street: string;
  city: string;
  postalCode?: string; // Optional field
}

export enum OnboardingStatus {
  completed = "completed",
  pending = "pending",
}

export interface IProfile {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
  onboardingStatus?: OnboardingStatus | null;
  settings?: {
    theme?: Themes;
    tradingMode?: TradingMode;
  };
}

export enum Activity {
  loggedInAt = "loggedInAt",
  loggedOutAt = "loggedOutAt",
  placedOrder = " placedOrder",
}

export interface IActivity {
  type: Activity;
  createdAt: string;
  uid: string;
}
