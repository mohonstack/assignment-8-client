
"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  Aperture,
  Menu,
  X,
  Sun,
  Moon,
  LayoutDashboard,
  PlusCircle,
  CalendarDays,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { authClient } from "../lib/auth-client";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Create Event", href: "/createEventForm" },
  { name: "Manage Events", href: "/manageEvents" },
];

const accountLinks = [
  {
    name: "Manage Events",
    href: "/manageEvents",
    icon: LayoutDashboard,
  },
  {
    name: "Create Event",
    href: "/createEventForm",
    icon: PlusCircle,
  },
  {
    name: "Joined Events",
    href: "/joinedEvents",
    icon: CalendarDays,
  },
];

// The theme lives on <html data-theme> (an external system), so it is read
// through useSyncExternalStore rather than setState-inside-effect. Listeners
// are notified whenever the attribute changes so the icon re-renders.
const themeListeners = new Set<() => void>();

const notifyThemeChange = () => {
  themeListeners.forEach((listener) => listener());
};

const subscribeTheme = (listener: () => void) => {
  themeListeners.add(listener);
  return () => {
    themeListeners.delete(listener);
  };
};

const getThemeSnapshot = () =>
  document.documentElement.getAttribute("data-theme") === "dark";

const getServerThemeSnapshot = () => false;

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const darkMode = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Sync the persisted theme onto <html> after hydration (DOM writes are what
  // effects are for); listeners are notified so the icon follows the attribute.
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";

    document.documentElement.setAttribute("data-theme", savedTheme);
    notifyThemeChange();
  }, []);

  const toggleTheme = () => {
    const nextTheme = darkMode ? "light" : "dark";

    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    notifyThemeChange();
  };
  // Logout
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setProfileMenuOpen(false);
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Close mobile menu after navigation
  const closeMenus = () => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 shadow-sm backdrop-blur-xl">

      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 text-black shadow-md">
            <Aperture size={27} strokeWidth={2.2} />
          </span>

          <span className="text-xl font-extrabold tracking-tight text-base-content">
            Impact<span className="text-lime-500">Connect</span>
            <span className="mt-0.5 block text-[10px] font-medium tracking-[0.2em] text-base-content/50">
              CREATE WITHOUT LIMITS
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-base-content/70 transition-colors hover:text-lime-600"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full text-base-content transition hover:bg-base-200"
          >
            {darkMode ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {/* Authentication */}
          {!isPending && (
            <>
              {user ? (
                <div className="relative hidden md:block">

                  {/* Profile Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setProfileMenuOpen((previous) => !previous)
                    }
                    aria-expanded={profileMenuOpen}
                    aria-label="Open profile menu"
                    className="flex items-center gap-2 rounded-full border border-base-300 p-1.5 pr-3 transition hover:border-lime-400"
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || "User"}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-400 font-bold text-black">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}

                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        profileMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {profileMenuOpen && (
                    <div className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl">

                      <div className="border-b border-base-300 px-3 py-3">
                        <p className="truncate font-bold text-base-content">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-base-content/50">
                          {user.email}
                        </p>
                      </div>

                      <div className="py-2">
                        {accountLinks.map((item) => {
                          const Icon = item.icon;

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={closeMenus}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-base-content/80 transition hover:bg-base-200 hover:text-lime-600"
                            >
                              <Icon size={18} />
                              {item.name}
                            </Link>
                          );
                        })}
                      </div>

                      <div className="border-t border-base-300 pt-2">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500/10"
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden items-center gap-3 md:flex">
                  <Link
                    href="/login"
                    className="rounded-full px-5 py-2.5 text-sm font-semibold text-base-content transition hover:bg-base-200"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signUp"
                    className="rounded-full bg-lime-400 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-lime-300"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((previous) => !previous)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-base-content transition hover:bg-base-200 lg:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-base-300 bg-base-100 px-4 py-5 shadow-lg lg:hidden">

          <div className="mx-auto max-w-7xl space-y-2">

            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenus}
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-base-content/80 transition hover:bg-base-200 hover:text-lime-600"
              >
                {item.name}
              </Link>
            ))}

            <div className="border-t border-base-300 pt-3">

              {user ? (
                <>
                  <div className="mb-3 flex items-center gap-3 px-3 py-2">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || "User"}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 font-bold text-black">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-base-content">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-base-content/50">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {accountLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-base-content/80 hover:bg-base-200"
                      >
                        <Icon size={18} />
                        {item.name}
                      </Link>
                    );
                  })}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-500/10"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    onClick={closeMenus}
                    className="rounded-xl px-4 py-3 text-center font-semibold hover:bg-base-200"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signUp"
                    onClick={closeMenus}
                    className="rounded-xl bg-lime-400 px-4 py-3 text-center font-bold text-black hover:bg-lime-300"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
