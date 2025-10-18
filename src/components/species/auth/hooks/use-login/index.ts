import { useState } from "react";
import { useRouter } from "next/navigation";
import { DEMO } from "@/constants/DEMO";
import { useNotificationModal } from "@/components/molecules/notification-modal/hook";
import { authService } from "@/store/services/authApi";

interface IFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const D = DEMO.auth

const mockDefaultValues: IFormData = {
  email: "samuelalisigwe22@gmail.com",
  password: "samuel123$",
  rememberMe: true,
}

const defaultValues: IFormData = {
  email: "",
  password: "",
};

export function useLogin() {
  const router = useRouter();
  const notification = useNotificationModal()
  // 
  const [formData, setFormData] = useState<IFormData>(D.formData ? mockDefaultValues : defaultValues);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // 
  const canSubmit = formData.email && formData.password && !submitting;
  // 
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const mutateFormData = (formData: Partial<IFormData>) =>
    setFormData(prev => ({ ...prev, ...formData }))

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !formData.password) {
      notification.danger(
        "Validation Error",
        "Email and password is required."
      );
      return;
    }

    if (!emailRegex.test(formData.email)) {
      notification.danger(
        "Validation Error",
        "Please enter a valid email address."
      );
      return;
    }

    notification.info(
      "Sign in successful",
      "Please wait while we verify your credentials..."
    );

    setSubmitting(true);

    authService.login(formData).then((res) => {
      console.log("🚀 ~ handleSubmit ~ res:", res)
    })
      .catch((err) => { 
        console.log("🚀 ~ handleSubmit ~ err:", err)
      })
      .finally(() => {
        setSubmitting(false);
      })
  };

  return {
    notification,
    formData,
    showPassword,
    submitting,
    canSubmit,
    toggleShowPassword,
    mutateFormData,
    handleSubmit
  }
}