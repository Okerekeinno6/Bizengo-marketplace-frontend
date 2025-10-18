import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotificationModal } from "@/components/molecules/notification-modal/hook";
import { authService } from "@/store/services/authApi";
import { userService } from "@/store/services/userApi";
// 
import {
  debug,
  IFormData,
  initialValues,
  useLoginUtils as _
} from './utils'

export function useLogin() {
  const router = useRouter();
  const notification = useNotificationModal()
  // 
  const [formData, setFormData] = useState<IFormData>(initialValues);
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

    const validated = _.validate(formData, notification)

    if (!validated) return

    setSubmitting(true);

    authService.login(formData).then((res) => {
      console.log("🚀 ~ login ~ res:", res)
      userService.getProfile(res.access_token).then((res) => {
        console.log("🚀 ~ getProfile ~ res:", res)
      }).catch((err) => {
        console.log("🚀 ~ getProfile ~ err:", err)
      })
        .finally(() => {
          setSubmitting(false);
        })
    })
      .catch((err) => {
        console.log("🚀 ~ login ~ err:", err)
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