import LoginComp from "@/components/custom_components/LoginComp";
import SignupComp from "@/components/custom_components/SignupComp";
import useUIStore from "@/store/uiStore";
import React, { useState } from "react";

function AuthPage() {
  const { authModalOpen, authType } = useUIStore();
  const isOpen = authType === "signup";

  const [error, seterror] = useState();
  const [isLoading, setisLoading] = useState();
  console.log(authType);
  if (!authModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    login(form.email.value, form.password.value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <SignupComp />
      <LoginComp />
    </div>
  );
}

export default AuthPage;
