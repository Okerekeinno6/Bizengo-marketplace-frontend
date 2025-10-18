import { useState } from "react";
import { NotificationModalVariantType } from "@/components/molecules/notification-modal";

type NotificationType = {
  type: NotificationModalVariantType;
  title: string;
  message?: string;
  show?: boolean;
}

const defaultValues: NotificationType = {
  type: "info",
  title: "",
}

const TIMEOUT = 5000;

export type UseNotificationModalType = ReturnType<typeof useNotificationModal>

export function useNotificationModal() {
  const [notification, setNotification] = useState<NotificationType>(defaultValues);

  const close = () => setNotification(defaultValues);

  function info(
    title: string,
    message?: string
  ) {
    setNotification({ type: 'info', title, message, show: true });
  }

  function success(
    title: string,
    message?: string
  ) {
    setNotification({ type: 'success', title, message, show: true });
    setTimeout(close, TIMEOUT);
  }

  function danger(
    title: string,
    message?: string
  ) {
    setNotification({ type: 'danger', title, message, show: true });
    setTimeout(close, TIMEOUT);
  }

  return {
    notification,
    info,
    success,
    danger,
    close,
  };
}
