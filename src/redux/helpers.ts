import { notify } from './notificationsSlice';
import { IToastNotification, ToastTypes } from '../interfaces/notifications';
import { AppDispatch } from './store';

export const handleNotify = (message: string, duration: number, type: ToastTypes,dispatch: AppDispatch, ) => {
  const notification: IToastNotification = {
    open: true,
    hideDuration: duration,
    message: message || "",
    type: type,
  };

  dispatch(notify({ notification }));
};


export const handleCloseNotification = (dispatch: AppDispatch) => {
  const notification: IToastNotification = {
    open: false,
    hideDuration: 0,
    message: "",
    type: ToastTypes.Info,
  };

  dispatch(notify({ notification }));
};
