import React, { Suspense } from "react";
import ResetMailSentForm from "./ResetMailSent";

export default function ResetMailSentPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-7">Reset OTP sent</h2>
      <p className="">
        An OTP has sent to you please check your inbox for the OTP.
      </p>
      <Suspense>
        <ResetMailSentForm />
      </Suspense>
    </div>
  );
}
