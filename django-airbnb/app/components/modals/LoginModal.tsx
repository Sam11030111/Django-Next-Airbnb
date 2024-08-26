"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import apiService from "@/app/sevices/apiService";
import { handleLogin } from "@/app/lib/actions";

import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";

const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const submitLogin = async () => {
    const data = {
      email: email,
      password: password
    }

    const res = await apiService.postWithoutToken('/api/auth/login/', JSON.stringify(data))

    if (res.access) {
        handleLogin(res.user.pk, res.access, res.refresh);

        loginModal.close();

        router.push('/')
    } else {
        setErrors(res.non_field_errors);
    }
  }

  const content = (
    <>
        <form action={submitLogin} className="space-y-4">
            <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

            <input onChange={(e) => setPassword(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
        
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
                label="Login"
                onClick={submitLogin}
            />
        </form>
    </>
  )

  return (
    <Modal
        isOpen={loginModal.isOpen}
        close={loginModal.close}
        label="Log in"
        content={content}
    />
  )
}

export default LoginModal