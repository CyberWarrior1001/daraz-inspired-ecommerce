import useUIStore from "@/store/uiStore";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignupComp() {
  const { authModalOpen, authType, closeAuth, openLogin, logedIn } = useUIStore();
  const isOpen = authModalOpen && authType === "signup";
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  console.log(formData);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true)
    const res = await axios.post(
      "http://localhost:3000/api/users/signup",
      formData,
      { withCredentials: true }
    );
    setisLoading(false)
    logedIn()
    
  };
  return (
    <div
      className={`w-full max-w-md p-6 rounded-xl bg-amber-50 transform transition-all duration-300 ease-out absolute  ${
        isOpen
          ? "translate-y-0 opacity-100 scale-100"
          : " translate-y-20 opacity-0 scale-95 pointer-events-none"
      } `}
    >
      <button
        onClick={closeAuth}
        className="absolute right-3 top-3 text-gray-400"
      >
        ✕
      </button>

      <h2 className="text-2xl text-center mb-6">Sign Up</h2>

      <form onSubmit={handleSubmit} className={`space-y-4`} method="POST">
        <input
          name="name"
          onChange={handleChange}
          className="w-full p-3 rounded bg-white border-2 border-gray-400"
          placeholder="Name"
        />
        <input
          name="email"
          onChange={handleChange}
          className="w-full p-3 rounded bg-white border-2 border-gray-400"
          placeholder="Email"
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          className="w-full p-3 rounded bg-white border-2 border-gray-400"
          placeholder="Password"
        />
        <input
          name="confirmpassword"
          onChange={handleChange}
          type="password"
          className="w-full p-3 rounded bg-white border-2 border-gray-400"
          placeholder="Confirm password"
        />

        {error && (
          <p className="text-red-500 text-sm">Some thing went wrong!</p>
        )}

        <button
          disabled={isLoading}
          className="w-full bg-blue-600 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <span className="text-gray-700 text-[12px]">
        Already have an Account{" "}
        <button onClick={openLogin} className="text-blue-900 text-[12px]">
          Login
        </button>
      </span>
    </div>
  );
}

export default SignupComp;
