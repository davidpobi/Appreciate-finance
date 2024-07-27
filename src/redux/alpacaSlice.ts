import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlpacaState, TradingMode } from "../interfaces/alpaca";
import { updateSettings, updateUserProfile } from "../services/user.service";

const storeLiveStatus = async (status: boolean, uid: string | null) => {
  if (uid === null || uid === undefined) {
    return;
  }
  await updateSettings(uid, { tradingMode: status ? TradingMode.live : TradingMode.paper });
  window.location.reload();
};

const initialState: AlpacaState = {
  account: null,
  refresh: false,
  isLive: null,
};

const alpacaSlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setAccountInfo: (state, action) => {
      const account = action.payload.data;
      return { ...state, account: account };
    },
    setRefresh: (state, action) => {
      const refresh = action.payload.state;
      console.log("refresh", refresh);
      return { ...state, refresh: refresh };
    },
    setLiveStatus: (state, action) => {
      const isLive: boolean = action.payload.status as boolean;
      const uid = action.payload.uid || null;
      storeLiveStatus(isLive, uid);
      return { ...state, isLive: isLive };
    },
  },
});

export const { setAccountInfo, setRefresh, setLiveStatus } = alpacaSlice.actions;
export default alpacaSlice.reducer;
