"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Button, Label } from "@heroui/react";
import { signUp } from "../lib/auth-client";
import { redirect } from "next/navigation";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value: string) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[0-9]/.test(value)) {
      return "Password must contain at least one number";
    }

    return "";
  };

  const handleOnSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const emailValidationError = validateEmail(
      String(formData.get("email") ?? ""),
    );
    const passwordValidationError = validatePassword(
      String(formData.get("password") ?? ""),
    );

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (emailValidationError || passwordValidationError) {
      return;
    }

    const signUpData = Object.fromEntries(formData.entries()) as {name:string, email:string, password:string}

    // console.log("Signup data:", signUpData);


    const {data,error} = await signUp.email({
        ...signUpData
    })

    if(data){
        console.log(data);
        redirect('/')
    }
    else{
        console.log(error);
    }

  };

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 px-4 py-12 sm:py-16">
      <section className="w-full max-w-md rounded-[1.5rem] border border-violet-100 bg-white px-6 py-8 shadow-xl shadow-violet-100/70 sm:px-8 sm:py-9">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-700 text-white shadow-lg shadow-violet-200">
            <svg
              aria-hidden="true"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.5 12.5 11 15l4.5-6"
              />
            </svg>
          </div>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-violet-950">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Join the community and start driving social change
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleOnSubmit}>
          <div>
            <Label
              htmlFor="name"
              className="mb-2 block text-xs font-bold text-violet-950"
            >
              Full Name
            </Label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 shadow-sm transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
              <svg
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-violet-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
                />
              </svg>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="email"
              className="mb-2 block text-xs font-bold text-violet-950"
            >
              Email Address
            </Label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 shadow-sm transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
              <svg
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-violet-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75A2.25 2.25 0 0 1 6 4.5h12a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 18 19.5H6a2.25 2.25 0 0 1-2.25-2.25V6.75Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 6 7.5 5.25L19.5 6"
                />
              </svg>
              <input
                id="email"
                name="email"
                type="email"
                required
                onBlur={(event) => setEmailError(validateEmail(event.target.value))}
                onChange={(event) => {
                  if (emailError) {
                    setEmailError(validateEmail(event.target.value));
                  }
                }}
                aria-describedby={emailError ? "email-error" : undefined}
                aria-invalid={Boolean(emailError)}
                placeholder="name@example.com"
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
            {emailError && (
              <p id="email-error" className="mt-1.5 text-xs text-red-500">
                {emailError}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="password"
              className="mb-2 block text-xs font-bold text-violet-950"
            >
              Password
            </Label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 shadow-sm transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
              <svg
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-violet-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="5" y="10" width="14" height="10" rx="2" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10V7a4 4 0 0 1 8 0v3"
                />
              </svg>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                onBlur={(event) =>
                  setPasswordError(validatePassword(event.target.value))
                }
                onChange={(event) => {
                  if (passwordError) {
                    setPasswordError(validatePassword(event.target.value));
                  }
                }}
                aria-describedby={passwordError ? "password-error" : undefined}
                aria-invalid={Boolean(passwordError)}
                placeholder="••••••••"
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((visible) => !visible)}
                className="text-slate-400 transition hover:text-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {passwordError && (
              <p id="password-error" className="mt-1.5 text-xs text-red-500">
                {passwordError}
              </p>
            )}
            <ul className="mt-2 space-y-1 text-[11px] text-slate-500">
              <li>• At least 8 characters</li>
              <li>• At least one uppercase letter</li>
              <li>• At least one number</li>
            </ul>
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl bg-violet-700 py-3 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:bg-violet-800"
          >
            <span>Register</span>
            <span aria-hidden="true" className="text-lg leading-none">
              →
            </span>
          </Button>
        </form>

        <p className="mt-7 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-violet-600 transition hover:text-violet-800"
          >
            Login here
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SignUpPage;
