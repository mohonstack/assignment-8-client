"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CircleCheck, CirclePlus, LogOut, Settings, Sun, Moon } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";

const Navbar = () => {


  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    if (darkMode) {
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };


  const { data: session } = useSession();
  const user = session?.user;
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const avatar = (
    <div className="avatar placeholder">
      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-violet-100 text-sm font-bold text-violet-700 ring-2 ring-violet-200">
        {user?.image ? (
          <span
            aria-hidden="true"
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url("${user.image}")` }}
          />
        ) : (
          user?.name?.charAt(0).toUpperCase()
        )}
      </div>
    </div>
  );

  return (
    <header className="navbar sticky top-0 z-50 border-b border-violet-200/70 bg-base-100 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className=" navbar-start flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-700 text-white shadow-lg ">
            <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5 11 15l4.5-6" />
            </svg>
          </span>
          <div>
            <span className="text-lg font-bold tracking-tight text-black">
              Impact<span className="text-violet-600">Connect</span>
            </span>
            <p className="text-slate-500 text-xs">Creating Impact</p>
          </div>
        </Link>

        <div className="navbar-center hidden md:flex">
          <Link
            href="/events"
            className="btn btn-ghost rounded-full px-5 text-sm font-semibold text-violet-800 hover:bg-violet-50 hover:text-violet-950"
          >
            Upcoming Events
          </Link>
        </div>

        <div className="navbar-end gap-2">



          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="btn btn-circle btn-ghost"
          >
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
          </button>



          {user ? (
            <div className="dropdown dropdown-end hidden md:block">
              <button
                type="button"
                tabIndex={0}
                aria-label="Open account menu"
                className="btn btn-ghost btn-circle h-auto min-h-0 border-0 p-0 shadow-none outline-none transition-shadow duration-200 hover:bg-transparent hover:shadow-xl hover:shadow-violet-300/80 focus:border-0 focus:bg-transparent focus:outline-none focus:ring-0 active:border-0 active:bg-transparent active:shadow-2xl active:shadow-violet-300/80"
              >
                {avatar}
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-3 w-64 rounded-2xl border border-violet-100 bg-white p-2 text-slate-700 shadow-xl shadow-violet-200/50"
              >
                <li className="pointer-events-none mb-1 border-b border-violet-100 px-3 py-2">
                  <span className="block p-0">
                    <strong className="text-violet-950">{user.name}</strong>
                    <small className="block truncate text-slate-500">{user.email}</small>
                  </span>
                </li>
                <li>
                  <Link href="/createEventForm" className="flex items-center gap-2">
                    <CirclePlus aria-hidden="true" size={17} className="text-violet-600" />
                    Create Event
                  </Link>
                </li>
                <li>
                  <Link href="/manageEvents" className="flex items-center gap-2">
                    <Settings aria-hidden="true" size={17} className="text-violet-600" />
                    Manage Events
                  </Link>
                </li>
                <li>
                  <Link href="/joinedEvents" className="flex items-center gap-2">
                    <CircleCheck aria-hidden="true" size={17} className="text-violet-600" />
                    Joined Events
                  </Link>
                </li>
                <li className="mt-1 border-t border-violet-100 pt-1">
                  <button type="button" onClick={() => signOut()} className="text-red-500 hover:bg-red-50">
                    <LogOut aria-hidden="true" size={17} />
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login" className="btn hidden rounded-full border-0 bg-violet-700 px-5 text-sm font-semibold text-white hover:bg-violet-800 md:inline-flex">
              Login
            </Link>
          )}

          <div className="relative md:hidden">
            <button
              type="button"
              tabIndex={0}
              aria-label="Open mobile navigation"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="btn btn-ghost btn-square border-0 text-violet-700 outline-none hover:bg-transparent focus:border-0 focus:bg-transparent focus:outline-none focus:ring-0"
            >
              <span className="text-xl">{isMobileMenuOpen ? "×" : "☰"}</span>
            </button>
            {isMobileMenuOpen && (
              <ul
                tabIndex={0}
                className="menu absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border border-violet-100 bg-white p-2 text-slate-700 shadow-xl shadow-violet-200/50"
              >
                {user ? (
                  <>
                    <li>
                      <button type="button" onClick={() => setIsProfileOpen((open) => !open)} className="flex items-center gap-3">
                        {avatar}
                        <span className="min-w-0 text-left">
                          <strong className="block truncate text-violet-950">{user.name}</strong>

                        </span>
                      </button>
                    </li>
                    {isProfileOpen && (
                      <li className="border-t border-violet-100 pt-1">
                        <li>
                          <Link href="/createEventForm" className="flex items-center gap-2">
                            <CirclePlus aria-hidden="true" size={17} className="text-violet-600" />
                            Create Event
                          </Link>
                        </li>
                        <li>
                          <Link href="/manageEvents" className="flex items-center gap-2">
                            <Settings aria-hidden="true" size={17} className="text-violet-600" />
                            Manage Events
                          </Link>
                        </li>
                        <li>
                          <Link href="/joinedEvents" className="flex items-center gap-2">
                            <CircleCheck aria-hidden="true" size={17} className="text-violet-600" />
                            Joined Events
                          </Link>
                        </li>
                        <button type="button" onClick={() => signOut()} className="text-red-500 hover:bg-red-50">
                          <LogOut aria-hidden="true" size={17} />
                          Log Out
                        </button>
                      </li>
                    )}
                  </>
                ) : (
                  <li><Link href="/login">Login</Link></li>
                )}
                <li><Link href="/events">Upcoming Events</Link></li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
