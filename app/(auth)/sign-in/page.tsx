import AuthForm from "@/app/components/AuthForm";
import React from "react";

const SignIn = () => {
  return (
    <div className="flex items-center justify-center w-svw">
      <AuthForm type="sign in" />
    </div>
  );
};

export default SignIn;
