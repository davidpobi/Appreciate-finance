export enum ToastTypes {
    Info = "Info",
    Success = "Success",
    Error = "Error",
    Warning = "Warning",
  }

export interface IToastNotification  {
    open: boolean;
    hideDuration?: number;
    message: string;
    type: ToastTypes;
}

export interface NotificationsState {
    notification: IToastNotification | null
}