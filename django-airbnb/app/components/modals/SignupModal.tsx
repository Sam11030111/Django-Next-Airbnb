"use client";

import { useState } from "react";
import useSignupModal from "@/app/hooks/useSignupModal";

import Modal from "./Modal";
import CustomButton from "../forms/CustomButton"

const SignupModal = () => {
  const signupModal = useSignupModal();

  const handleSignup = () => {

  }

  const content = (
    <>
        <form className="space-y-4">
            <input placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

            <input placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

            <input placeholder="Repeat password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
        
            <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">
                Error Message
            </div>

            <CustomButton
                label="Sign up"
                onClick={handleSignup}
            />
        </form>
    </>
  )

  return (
    <Modal
        isOpen={signupModal.isOpen}
        close={signupModal.close}
        label="Sign up"
        content={content}
    />
  )
}

export default SignupModal