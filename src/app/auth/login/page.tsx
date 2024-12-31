"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useAddUserMutation } from "@/Store/apiSlice";
import { useRouter } from "next/navigation";
import Img1 from "../../../../public/small-team-discussing-ideas-2194220-0.svg";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData } from "../../../Store/authSlice";
import { RootState } from "../../../Store/Store";

const Page = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [addUser, { isLoading, isError, error }] = useAddUserMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  // Access Redux state for new/returning user logic
  const users = useSelector((state: RootState) => state.auth.mobileNumber);
  const isNewUser = !users.includes(mobile); // Determine if the user is new

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // API Call to authenticate user
      const userData = await addUser({ mobile, password }).unwrap();

      // Dispatch the authenticated user data to Redux
      dispatch(setAuthData({
        mobileNumber: mobile, 
        password: password, 
      }));
  
      // Check new/returning user logic
      if (userData.isNewUser) {
        console.log("Welcome, new user!");
      } else {
        console.log("Welcome back!");
      }

      // Redirect to homepage
      router.push("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="p-5">
      <div className="font-semibold text-[20px]">The Language Network</div>
      <div className="w-full h-[900px] flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-[505px] h-[701px] border-black border-[0.5px] rounded-xl"
        >
          <div className="flex flex-col gap-10 p-10">
            <div className="text-[25px]">Welcome!</div>
            <div>
              <div className="text-[31px] font-medium">Sign in to</div>
              <div className="text-[16px]">The TLN Admin Panel</div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-[38px]">
                <div className="w-full">
                  <div className="mb-2 ml-1 text-[16px]">Mobile</div>
                  <input
                    type="tel"
                    className="w-full outline-none text-[14px] rounded-md pl-6 py-5 border-black border-[0.5px]"
                    id="mobile"
                    placeholder="Enter Your Mobile no"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <div className="mb-2 ml-1 text-[16px]">Password</div>
                  <input
                    className="w-full outline-none text-[14px] rounded-md pl-6 py-5 border-black border-[0.5px]"
                    type="password"
                    id="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full text-[12px] text-[#4D4D4D] flex justify-between items-center">
                <div className="flex gap-3">
                  <input type="checkbox" />
                  <div>Remember Me</div>
                </div>
                <div>Forgot Password?</div>
              </div>
              <button
                type="submit"
                className={`bg-black rounded-md text-white text-center py-4 text-[16px] ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            {isError && (
              <div className="text-red-500 text-center text-[14px]">
                {(() => {
                  if ("data" in error && typeof error.data === "object" && error.data !== null) {
                    return (error.data as { message?: string }).message || "Login failed. Please try again.";
                  } else if ("status" in error) {
                    return `Error: ${error.status}`;
                  } else if ("message" in error) {
                    return error.message;
                  }
                  return "An unknown error occurred.";
                })()}
              </div>
            )}
            <div className="text-[16px] text-center text-[#4D4D4D]">
              Don’t have an Account?{" "}
              <strong className="text-black">Request</strong>
            </div>
          </div>
        </form>
        <Image
          alt="Login"
          className="xl:flex lg:flex hidden w-fit h-fit"
          src={Img1}
        />
      </div>
    </div>
  );
};

export default Page;
