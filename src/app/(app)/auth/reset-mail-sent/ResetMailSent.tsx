"use client";
import Button from "@/app/components/common/buttons/Button";
import OtpInput from "@/app/components/common/inputFields/OtpInput";
import { showToast } from "@/app/components/ui/CustomToast";
import { verifyOtp } from "@/app/lib/api/authRoutes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const ResetMailSentForm = () => {
  const router = useRouter();
  const searchParam = useSearchParams()
  const email = searchParam.get("email") || ""
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (val: string) => {
    setOtp(val);
  };

  const handleSubmit = async () => {
    if (!email) {
      showToast("Email is required", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await verifyOtp({
        email,
        otp,
      });

      if (response.data.status) {
        showToast(response.data.message, "success");
        router.push(`/auth/reset-password?email=${email}&otp=${otp}`);
        // optionally redirect or show success screen
      } else {
        showToast("Verification failed", "error");
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Something went wrong!";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="mt-4">
        <OtpInput length={4} onChangeOtp={handleOtpChange} />
      </div>
      <Button
        label={loading ? "Verifying..." : "Verify"}
        disabled={otp.length !== 4 || loading}
        className="mt-4 w-full"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default ResetMailSentForm;
