
import Link from "next/link";

interface FooterLink {
    href: string;
    label: string;
}

const footerLinks: FooterLink[] = [
    { href: "/events", label: "Upcoming Events" },
    { href: "/createEventForm", label: "Create an Event" },
    { href: "/manageEvents", label: "Manage Events" },
];

const Footer = () => {
    const currentYear: number = new Date().getFullYear();

    return (
        <footer className="border-t border-violet-200/70 bg-base-100">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-16">

                {/* Brand Section */}
                <div>
                    <Link
                        href="/"
                        aria-label="ImpactConnect home"
                        className="group inline-flex items-center gap-3"
                    >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-700 text-white shadow-lg shadow-violet-200 transition-transform duration-300 group-hover:scale-105">
                            <svg
                                aria-hidden="true"
                                className="h-6 w-6"
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
                        </span>

                        <span>
                            <span className="block text-lg font-bold tracking-tight text-violet-950">
                                Impact<span className="text-violet-600">Connect</span>
                            </span>
                            <span className="block text-xs text-slate-500">
                                Creating Impact
                            </span>
                        </span>
                    </Link>

                    <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">
                        Connecting people with meaningful community initiatives
                        and creating lasting positive change together.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h2 className="text-sm font-bold text-violet-950">
                        Explore
                    </h2>

                    <nav
                        aria-label="Footer navigation"
                        className="mt-4 flex flex-col items-start gap-3"
                    >
                        {footerLinks.map((link: FooterLink) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-slate-500 transition-all duration-200 hover:translate-x-1 hover:text-violet-700"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Call to Action */}
                <div>
                    <h2 className="text-sm font-bold text-violet-950">
                        Get Involved
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-slate-500">
                        Join a local drive, volunteer your time, and help
                        build a stronger community.
                    </p>

                    <Link
                        href="/events"
                        className="group mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-violet-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                    >
                        Find an Event

                        <svg
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h14m-7-7 7 7-7 7"
                            />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-violet-100">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-center text-xs text-slate-500 sm:flex-row sm:px-8 sm:text-left lg:px-16">
                    <p>
                        © {currentYear} ImpactConnect. All rights reserved.
                    </p>

                    <p>Made for communities that care.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
