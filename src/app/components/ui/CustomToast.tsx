import { toast } from "react-hot-toast";
import {
  CloseIcon,
  ToastCheck,
  ToastCross,
} from "../common/allImages/AllImages";

const CustomToast = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) => {
  return (
    <div
      className={`flex w-[350px] items-start p-4 rounded-lg shadow-lg border ${
        type === "success"
          ? "bg-orange-50 border-orange-300"
          : "bg-red-50 border-red-300"
      }`}
    >
      {/* Icon */}
      <div className={`w-6 h-6 flex items-center justify-center mr-3`}>
        {type === "success" ? (
          <div>
            <ToastCheck />
          </div>
        ) : (
          <div>
            <ToastCross />
          </div>
        )}
      </div>
      {/* Message */}
      <div className="flex-1">
        <p className="font-semibold text-darkBlue">
          {type === "success" ? "Success" : "Error Occurred"}
        </p>
        <p className="text-sm text-darkGray">{message}</p>
      </div>
      {/* Close Button */}
      <button
        onClick={() => toast.dismiss()}
        className="text-gray-400 hover:text-gray-600"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

// Function to trigger the toast
export const showToast = (message: string, type: "success" | "error") => {
  toast.custom(() => <CustomToast message={message} type={type} />, {
    duration: 5000,
  });
};
