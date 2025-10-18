"use client";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft, MapPin, Loader2 } from "lucide-react";
//
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NotificationModal } from "@/components/molecules/notification-modal";
import { PATH } from "@/constants/PATH";
//
import { useLogin } from "@/components/species/auth/hooks/use-login";

export default function LoginPage() {
  const {
    notification,
    formData,
    showPassword,
    submitting,
    canSubmit,
    toggleShowPassword,
    mutateFormData,
    handleSubmit,
  } = useLogin();

  return (
    <>
      <NotificationModal
        show={notification.notification.show}
        onClose={notification.close}
        title={notification.notification.title}
        message={notification.notification.message}
        variant={notification.notification.type}
      />

      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link
              href={PATH.home}
              className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          <Card className="relative border border-gray-200 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2 text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>Sign in to access your account</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
              <fieldset  className="space-y-4" disabled={!canSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(ev) => mutateFormData({ email: ev.target.value })}
                    placeholder="enter@example.com"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(ev) => mutateFormData({ password: ev.target.value })}
                      placeholder="Enter your password"
                      required
                      className="pr-10 h-11"
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-700 disabled:opacity-50"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(ev) => mutateFormData({ rememberMe: ev.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  className="w-full transition-all duration-200 h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="text-xs text-gray-500">
                  <p>* Required fields</p>
                </div>
                </fieldset>
              </form>

              <div className="text-sm text-center text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Sign up here
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
