import { Loader2, CheckCircle, XCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type VariantType = "info" | "success" | "danger";

type PropsType = {
  show: boolean;
  onClose: () => void;
  title: string;
  message: string;
  variant?: VariantType;
};

export const NotificationModal: React.FC<PropsType> = ({
  show,
  onClose,
  title,
  message,
  variant = "danger",
}) => {
  if (!show) return null;

  const variantStyles = getVariantStyles(variant);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={variant !== "info" ? onClose : undefined}
      />

      <div
        className={`relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 border-2 ${variantStyles.border}`}
      >
        {variant !== "info" && (
          <button
            onClick={onClose}
            className="absolute text-gray-400 transition-colors top-4 right-4 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className={`p-8 rounded-t-xl ${variantStyles.background}`}>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {renderIcon(variant)}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <p className="leading-relaxed text-gray-700">{message}</p>
          </div>
        </div>

        {variant !== "info" && (
          <div className="p-6 bg-white rounded-b-xl">
            <Button
              onClick={onClose}
              className={`w-full ${variantStyles.button} text-white`}
            >
              OK
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

function renderIcon(variant: VariantType) {
  switch (variant) {
    case "info":
      return <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />;
    case "success":
      return <CheckCircle className="w-12 h-12 text-green-500" />;
    default:
      return <XCircle className="w-12 h-12 text-red-500" />;
  }
}

function getVariantStyles(variant: VariantType) {
  switch (variant) {
    case "success":
      return {
        background: "bg-green-50",
        border: "border-green-200",
        button: "bg-green-600 hover:bg-green-700",
      };
    case "danger":
      return {
        background: "bg-red-50",
        border: "border-red-200",
        button: "bg-red-600 hover:bg-red-700",
      };
    case "info":
      return {
        background: "bg-blue-50",
        border: "border-blue-200",
        button: "bg-blue-600 hover:bg-blue-700",
      };
  }
}
