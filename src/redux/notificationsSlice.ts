import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { IToastNotification, NotificationsState, ToastTypes } from '../interfaces/notifications';


const notificationDefault: IToastNotification = {
  open: false,
  hideDuration: 3000,
  message: "",
  type: ToastTypes.Error,
};


const initialState: NotificationsState = {   
 notification: notificationDefault
} 

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notify : (state,action) => {
     return { ...state, notification: {...action.payload.notification}}
    },
  },
})

export const { notify} = notificationsSlice.actions
export default notificationsSlice.reducer
