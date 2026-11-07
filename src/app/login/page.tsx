"use client";

import Link from "next/link";
import { type FormEvent, Suspense, useState } from "react";
import { Button, Label } from "@heroui/react";
import { signIn } from "../lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

const LoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")

  // redirect() is not allowed inside event handlers (it throws an uncaught
  // NEXT_REDIRECT error), so client-side navigation must go through the router.
  const getPostLoginPath = () => {
    const next = searchParams.get("next");
    // Starts with "/" keeps it same-origin; rejecting "//" (and "/\") also
    // blocks protocol-relative URLs like "//evil.com", which would otherwise
    // turn this into an open redirect.
    return next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\")
      ? next
      : "/";
  };
  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const loginData = Object.fromEntries(formData.entries())as{email:string, password:string}

    const { error } = await signIn.email({
      ...loginData
    })

    if(!error){
      router.push(getPostLoginPath());
      router.refresh();
    }
    else{
      setErrorMessage(error.message as string)
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: getPostLoginPath(),
    });

    if (error) {
      setErrorMessage(error.message as string);
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
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to organize and join community drives
          </p>
          <p className="text-red-500 font-extralight">{errorMessage}</p>
        </div>

        <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
          <div>
            <Label
              htmlFor="email"
              className="mb-2 block text-xs font-bold text-violet-950"
            >
              Email
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
                placeholder="name@example.com"
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label
                htmlFor="password"
                className="block text-xs font-bold text-violet-950"
              >
                Password
              </Label>
            </div>
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
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl bg-violet-700 py-3 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:bg-violet-800"
          >
            <span>Sign In</span>
            <span aria-hidden="true" className="text-lg leading-none">
              →
            </span>
          </Button>
        </form>

        <div className="my-7 flex items-center gap-3 text-xs font-semibold text-slate-400">
          <span className="h-px flex-1 bg-violet-100" />
          OR CONTINUE WITH
          <span className="h-px flex-1 bg-violet-100" />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          className="w-full rounded-xl border-violet-100 bg-white py-3 text-sm font-bold text-violet-950 hover:bg-violet-50"
        >
          <span className="font-black text-fuchsia-500">G</span>
          Continue with Google
        </Button>

        <p className="mt-7 text-center text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signUp"
            className="font-bold text-violet-600 transition hover:text-violet-800"
          >
            Register here
          </Link>
        </p>
      </section>
    </main>
  );
};

// useSearchParams() requires a Suspense boundary for static prerendering.
const LoginPage = () => (
  <Suspense fallback={null}>
    <LoginContent />
  </Suspense>
);

export default LoginPage;
