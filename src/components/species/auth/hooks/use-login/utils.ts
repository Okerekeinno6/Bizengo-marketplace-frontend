import { UseNotificationModalType } from "@/components/molecules/notification-modal/hook";
import { DEBUG } from "@/constants/DEBUG";

export const debug = DEBUG.auth

export interface IFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const mockDefaultValues: IFormData = {
  email: "samuelalisigwe22@gmail.com",
  password: "samuel123$",
  rememberMe: true,
}

export const defaultValues: IFormData = {
  email: "",
  password: "",
};

export const initialValues = debug.formData ? mockDefaultValues : defaultValues

function validate(formData: IFormData, notification: UseNotificationModalType) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.email || !formData.password) {
    notification.danger(
      "Validation Error",
      "Email and password is required."
    );
    return false;
  }

  if (!emailRegex.test(formData.email)) {
    notification.danger(
      "Validation Error",
      "Please enter a valid email address."
    );
    return false;
  }

  notification.info(
    "Sign in successful",
    "Please wait while we verify your credentials..."
  );

  return true
}


export const useLoginUtils = { validate }