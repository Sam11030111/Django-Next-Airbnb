"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/app/sevices/apiService";
import useSignupModal from "@/app/hooks/useSignupModal";
import { handleLogin } from "@/app/lib/actions";

import Modal from "./Modal";
import CustomButton from "../forms/CustomButton"

const SignupModal = () => {
  const router = useRouter();
  const signupModal = useSignupModal();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<string[]>([]);


  const submitSignup = async () => {
    const data = {
      email: email,
      password1: password1,
      password2: password2
    }

    const res = await apiService.post("/api/auth/register/", JSON.stringify(data));

    if (res.access) {
      // handle login
      handleLogin(res.user.pk, res.access, res.refresh)

      signupModal.close();
      router.push("/");
    } else {
      const tmpErrors: string[] = Object.values(res).map((err: any) => {
        return err;
      })

      setErrors(tmpErrors);
    }
  }

  const content = (
    <>
        <form action={submitSignup} className="space-y-4">
            <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

            <input onChange={(e) => setPassword1(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

            <input onChange={(e) => setPassword2(e.target.value)} placeholder="Repeat password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
        
            {errors.map((error, index) => {
              return (
                <div 
                    key={`error_${index}`}
                    className="p-5 bg-airbnb text-white rounded-xl opacity-80"
                >
                    {error}
                </div>
              )
            })}

            <CustomButton
                label="Sign up"
                onClick={submitSignup}
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