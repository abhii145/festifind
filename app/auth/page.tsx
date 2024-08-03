"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import axios from "axios"
import { loginUser, signupUser } from "@/store/slices/userSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

const signupSchema = loginSchema
  .extend({
    name: z.string().min(1, "Name is required"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type LoginFormInputs = z.infer<typeof loginSchema>
export type SignupFormInputs = z.infer<typeof signupSchema>

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
   const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const loginForm = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const signupForm = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "", name: "" },
  })

  const onLoginSubmit = async (data: LoginFormInputs) => {
    try {
    const result = await dispatch(loginUser(data))
    if (loginUser.fulfilled.match(result)) {
      router.push("/")
    }
    } catch (error: any) {
      console.log(error.response)
    }
  }

  const onSignupSubmit = async (data: SignupFormInputs) => {
    try {
      const result = await dispatch(signupUser(data))
      if (signupUser.fulfilled.match(result)) {
        router.push("/")
      }
    } catch (error: any) {
      console.log(error.response)
    }
  }

  const toggleForm = () => {
    if (isLogin) {
      loginForm.reset()
    } else {
      signupForm.reset()
    }
    setIsLogin(!isLogin)
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form
          onSubmit={
            isLogin
              ? loginForm.handleSubmit(onLoginSubmit)
              : signupForm.handleSubmit(onSignupSubmit)
          }
        >
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                {...signupForm.register("name")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
              {signupForm.formState.errors.name && (
                <p className="text-red-500 text-sm">
                  {signupForm.formState.errors.name.message}
                </p>
              )}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...(isLogin
                ? loginForm.register("email")
                : signupForm.register("email"))}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {isLogin && loginForm.formState.errors.email && (
              <p className="text-red-500 text-sm">
                {loginForm.formState.errors.email.message}
              </p>
            )}
            {!isLogin && signupForm.formState.errors.email && (
              <p className="text-red-500 text-sm">
                {signupForm.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...(isLogin
                ? loginForm.register("password")
                : signupForm.register("password"))}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {isLogin && loginForm.formState.errors.password && (
              <p className="text-red-500 text-sm">
                {loginForm.formState.errors.password.message}
              </p>
            )}
            {!isLogin && signupForm.formState.errors.password && (
              <p className="text-red-500 text-sm">
                {signupForm.formState.errors.password.message}
              </p>
            )}
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                {...signupForm.register("confirmPassword")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
              {signupForm.formState.errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {signupForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}
          <button
            type="submit"
            className={clsx("w-full p-2 text-white rounded", {
              "bg-blue-500 hover:bg-blue-700": isLogin,
              "bg-green-500 hover:bg-green-700": !isLogin,
            })}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={toggleForm}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Auth
