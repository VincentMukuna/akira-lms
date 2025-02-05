import { useTheme } from '@/components/theme-provider';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export default function Welcome({ auth }: PageProps) {
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    return (
        <>
            <Head title="AkiraLMS - AI-Powered Learning Management System" />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
                {/* Navigation with Mega Menu */}
                <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md dark:bg-black/80">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center gap-8">
                                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                    Akira<span className="text-gray-800 dark:text-white">LMS</span>
                                </span>
                                <div className="hidden lg:flex lg:gap-8">
                                    <button
                                        onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                                        className="group inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 transition hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                                    >
                                        Solutions
                                        <svg
                                            className={`h-4 w-4 transition-transform duration-200 ${
                                                isMegaMenuOpen ? 'rotate-180' : ''
                                            }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                    <a
                                        href="#features"
                                        className="text-sm font-medium text-gray-700 transition hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                                    >
                                        Features
                                    </a>
                                    <a
                                        href="#testimonials"
                                        className="text-sm font-medium text-gray-700 transition hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                                    >
                                        Testimonials
                                    </a>
                                    <a
                                        href="#case-studies"
                                        className="text-sm font-medium text-gray-700 transition hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                                    >
                                        Case Studies
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-medium text-gray-700 transition hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mega Menu with Transitions */}
                    <div
                        className={`absolute left-0 right-0 transform overflow-hidden bg-white shadow-xl transition-all duration-300 ease-in-out dark:bg-gray-900 ${
                            isMegaMenuOpen
                                ? 'visible max-h-[32rem] opacity-100'
                                : 'invisible max-h-0 opacity-0'
                        }`}
                    >
                        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                <div className="transform transition-all duration-300 ease-in-out hover:scale-[1.02]">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Corporate Training
                                    </h3>
                                    <div className="mt-4 space-y-4">
                                        <a
                                            href="#"
                                            className="block text-sm text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                                        >
                                            Employee Onboarding
                                        </a>
                                        <a
                                            href="#"
                                            className="block text-sm text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                                        >
                                            Compliance Training
                                        </a>
                                        <a
                                            href="#"
                                            className="block text-sm text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                                        >
                                            Skills Development
                                        </a>
                                    </div>
                                </div>
                                <div className="transform transition-all duration-300 ease-in-out hover:scale-[1.02]">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Educational Institutions
                                    </h3>
                                    <div className="mt-4 space-y-4">
                                        <a
                                            href="#"
                                            className="block text-sm text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                                        >
                                            K-12 Learning
                                        </a>
                                        <a
                                            href="#"
                                            className="block text-sm text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                                        >
                                            Higher Education
                                        </a>
                                        <a
                                            href="#"
                                            className="block text-sm text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                                        >
                                            Professional Certification
                                        </a>
                                    </div>
                                </div>
                                <div className="transform bg-indigo-50 p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] dark:bg-gray-800">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Why AkiraLMS?
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        Discover how our AI-powered platform can transform your
                                        organization's learning experience.
                                    </p>
                                    <Link
                                        href={route('register')}
                                        className="mt-4 inline-block rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-indigo-500"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative pt-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
                            <div className="max-w-2xl">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                                    Transform Learning with{' '}
                                    <span className="text-indigo-600 dark:text-indigo-400">
                                        AI-Powered
                                    </span>{' '}
                                    Education
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                    Empower your organization with an intelligent learning platform
                                    that adapts to each learner's needs. Perfect for corporate
                                    training and educational institutions.
                                </p>
                                <div className="mt-10 flex items-center gap-x-6">
                                    <Link
                                        href={route('register')}
                                        className="rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                                    >
                                        Start Free Trial
                                    </Link>
                                    <a
                                        href="#features"
                                        className="text-base font-semibold leading-7 text-gray-900 transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                                    >
                                        Learn more →
                                    </a>
                                </div>
                            </div>
                            <div className="relative">
                                {/* Decorative elements */}
                                <div className="absolute -right-12 top-0 z-0 h-72 w-72 rounded-full bg-indigo-100 blur-3xl dark:bg-indigo-900/30"></div>
                                <div className="absolute -left-12 bottom-0 z-0 h-72 w-72 rounded-full bg-purple-100 blur-3xl dark:bg-purple-900/30"></div>

                                {/* Product Image Container */}
                                <div className="relative z-10 rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-gray-900/10 dark:bg-gray-900 dark:ring-gray-800">
                                    <img
                                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
                                        alt="AkiraLMS Platform Interface"
                                        className="w-full rounded-xl bg-muted shadow-lg"
                                        width={1000}
                                        height={700}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src =
                                                'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
                                        }}
                                    />

                                    {/* AI-Powered Card - Top Left */}
                                    <div className="absolute -left-8 -top-12 rotate-[-6deg] transform rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-900/10 transition-transform hover:rotate-0 hover:scale-105 dark:bg-gray-800 dark:ring-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
                                                <svg
                                                    className="h-5 w-5 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    AI-Powered
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Smart Learning Paths
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skill Tracking Card - Top Right */}
                                    <div className="absolute -right-4 -top-1 rotate-[8deg] transform rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-900/10 transition-transform hover:rotate-0 hover:scale-105 dark:bg-gray-800 dark:ring-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
                                                <svg
                                                    className="h-5 w-5 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    Skill Tracking
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Progress Monitoring
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Team Learning Card - Bottom Left */}
                                    <div className="absolute -bottom-8 -left-12 rotate-[4deg] transform rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-900/10 transition-transform hover:rotate-0 hover:scale-105 dark:bg-gray-800 dark:ring-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600">
                                                <svg
                                                    className="h-5 w-5 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    Team Learning
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Collaborative Growth
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Analytics Card - Bottom Right */}
                                    <div className="absolute -bottom-14 -right-8 rotate-[-5deg] transform rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-900/10 transition-transform hover:rotate-0 hover:scale-105 dark:bg-gray-800 dark:ring-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600">
                                                <svg
                                                    className="h-5 w-5 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    Real-time Analytics
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Track Progress
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rich Content Card - Middle Left */}
                                    <div className="absolute -left-16 top-1/3 rotate-[-8deg] transform rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-900/10 transition-transform hover:rotate-0 hover:scale-105 dark:bg-gray-800 dark:ring-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                                                <svg
                                                    className="h-5 w-5 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    Rich Content
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Interactive Learning
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Certifications Card - Middle Right */}
                                    <div className="absolute -right-12 top-1/2 rotate-[6deg] transform rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-900/10 transition-transform hover:rotate-0 hover:scale-105 dark:bg-gray-800 dark:ring-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-600">
                                                <svg
                                                    className="h-5 w-5 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    Certifications
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Verify Skills
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                Everything you need to accelerate learning
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                Our AI-powered platform provides personalized learning paths,
                                detailed analytics, and engaging content delivery.
                            </p>
                        </div>

                        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Feature 1 */}
                            <div className="flex flex-col items-start">
                                <div className="rounded-2xl bg-indigo-600/10 p-3 dark:bg-indigo-400/10">
                                    <svg
                                        className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                                    AI-Powered Learning
                                </h3>
                                <p className="mt-4 text-gray-600 dark:text-gray-300">
                                    Personalized learning paths adapt to each student's pace and
                                    style, ensuring optimal knowledge retention.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex flex-col items-start">
                                <div className="rounded-2xl bg-indigo-600/10 p-3 dark:bg-indigo-400/10">
                                    <svg
                                        className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                                    Advanced Analytics
                                </h3>
                                <p className="mt-4 text-gray-600 dark:text-gray-300">
                                    Track progress and identify areas for improvement with detailed
                                    insights and reporting tools.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex flex-col items-start">
                                <div className="rounded-2xl bg-indigo-600/10 p-3 dark:bg-indigo-400/10">
                                    <svg
                                        className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                                    Team Collaboration
                                </h3>
                                <p className="mt-4 text-gray-600 dark:text-gray-300">
                                    Foster engagement with built-in collaboration tools, discussion
                                    forums, and group projects.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="bg-gray-50 py-24 dark:bg-gray-900">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                Trusted by Industry Leaders
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                See what our customers are saying about their experience with
                                AkiraLMS.
                            </p>
                        </div>

                        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Testimonial 1 */}
                            <div className="relative rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
                                <div className="flex items-center gap-4">
                                    <img
                                        src="https://randomuser.me/api/portraits/women/32.jpg"
                                        alt="Sarah Johnson"
                                        className="h-12 w-12 rounded-full"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Sarah Johnson
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Head of L&D, TechCorp
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-6 text-gray-600 dark:text-gray-300">
                                    "AkiraLMS has revolutionized our employee training program. The
                                    AI-powered personalization ensures each team member gets exactly
                                    what they need."
                                </p>
                            </div>

                            {/* Testimonial 2 */}
                            <div className="relative rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
                                <div className="flex items-center gap-4">
                                    <img
                                        src="https://randomuser.me/api/portraits/men/46.jpg"
                                        alt="Michael Chen"
                                        className="h-12 w-12 rounded-full"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Michael Chen
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Dean, Global University
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-6 text-gray-600 dark:text-gray-300">
                                    "The analytics and insights provided by AkiraLMS have helped us
                                    improve student engagement and outcomes significantly."
                                </p>
                            </div>

                            {/* Testimonial 3 */}
                            <div className="relative rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
                                <div className="flex items-center gap-4">
                                    <img
                                        src="https://randomuser.me/api/portraits/women/68.jpg"
                                        alt="Emma Rodriguez"
                                        className="h-12 w-12 rounded-full"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Emma Rodriguez
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            CEO, InnovatEd
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-6 text-gray-600 dark:text-gray-300">
                                    "The collaboration features have transformed how our teams learn
                                    together. It's more than just an LMS - it's a complete learning
                                    ecosystem."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Case Studies Section */}
                <section id="case-studies" className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                Success Stories
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                See how organizations are transforming their learning programs with
                                AkiraLMS.
                            </p>
                        </div>

                        <div className="mt-20 grid gap-12 lg:grid-cols-2">
                            {/* Case Study 1 */}
                            <div className="group relative overflow-hidden rounded-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                                    alt="TechCorp Case Study"
                                    className="aspect-video w-full object-cover transition group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-black/0 p-8">
                                    <h3 className="text-2xl font-bold text-white">
                                        TechCorp's Learning Transformation
                                    </h3>
                                    <p className="mt-2 text-gray-200">
                                        How TechCorp reduced training time by 45% while improving
                                        knowledge retention.
                                    </p>
                                    <a
                                        href="#"
                                        className="mt-4 text-sm font-medium text-white hover:text-indigo-200"
                                    >
                                        Read Case Study →
                                    </a>
                                </div>
                            </div>

                            {/* Case Study 2 */}
                            <div className="group relative overflow-hidden rounded-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
                                    alt="Global University Case Study"
                                    className="aspect-video w-full object-cover transition group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-black/0 p-8">
                                    <h3 className="text-2xl font-bold text-white">
                                        Global University's Digital Revolution
                                    </h3>
                                    <p className="mt-2 text-gray-200">
                                        Achieving 92% student satisfaction with personalized
                                        learning paths.
                                    </p>
                                    <a
                                        href="#"
                                        className="mt-4 text-sm font-medium text-white hover:text-indigo-200"
                                    >
                                        Read Case Study →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-24 shadow-2xl sm:px-24">
                            <div className="relative">
                                <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Ready to revolutionize learning?
                                </h2>
                                <p className="mx-auto mt-6 max-w-xl text-center text-lg text-indigo-100">
                                    Join thousands of organizations already transforming their
                                    learning experience with AkiraLMS.
                                </p>
                                <div className="mt-10 flex justify-center">
                                    <Link
                                        href={route('register')}
                                        className="rounded-full bg-white px-8 py-4 text-base font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-50"
                                    >
                                        Get Started Today
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mega Footer */}
                <footer className="bg-gray-900 text-gray-300">
                    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                            {/* Company Info */}
                            <div className="space-y-4">
                                <span className="text-2xl font-bold text-white">
                                    Akira<span className="text-indigo-400">LMS</span>
                                </span>
                                <p className="text-sm">
                                    Transforming corporate and educational learning with AI-powered
                                    solutions.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="hover:text-indigo-400">
                                        <svg
                                            className="h-6 w-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="hover:text-indigo-400">
                                        <svg
                                            className="h-6 w-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="hover:text-indigo-400">
                                        <svg
                                            className="h-6 w-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Solutions */}
                            <div>
                                <h3 className="text-lg font-semibold text-white">Solutions</h3>
                                <ul className="mt-4 space-y-3">
                                    <li>
                                        <a href="#" className="hover:text-indigo-400">
                                            Corporate Training
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-indigo-400">
                                            Higher Education
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-indigo-400">
                                            K-12 Learning
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-indigo-400">
                                            Professional Development
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Company */}
                            <div>
                                <h3 className="text-lg font-semibold text-white">Company</h3>
                                <ul className="mt-4 space-y-3">
                                    <li>
                                        <a href="#" className="hover:text-indigo-400">
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-indigo-400">
                                            Careers
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-indigo-400">
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-indigo-400">
                                            Press
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Resources */}
                            <div>
                                <h3 className="text-lg font-semibold text-white">Resources</h3>
                                <ul className="mt-4 space-y-3">
                                    <li>
                                        <a href="#" className="hover:text-indigo-400">
                                            Documentation
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-indigo-400">
                                            Help Center
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-indigo-400">
                                            Community
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-indigo-400">
                                            Contact Sales
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 border-t border-gray-800 pt-8">
                            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                                <p className="text-sm">
                                    © {new Date().getFullYear()} AkiraLMS. All rights reserved.
                                </p>
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm">Theme:</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-gray-800">
                                                {theme === 'light' && <Sun className="h-4 w-4" />}
                                                {theme === 'dark' && <Moon className="h-4 w-4" />}
                                                {theme === 'system' && (
                                                    <Monitor className="h-4 w-4" />
                                                )}
                                                <span className="capitalize">{theme}</span>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-32">
                                                <DropdownMenuItem
                                                    onClick={() => setTheme('light')}
                                                    className="gap-2"
                                                >
                                                    <Sun className="h-4 w-4" />
                                                    <span>Light</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => setTheme('dark')}
                                                    className="gap-2"
                                                >
                                                    <Moon className="h-4 w-4" />
                                                    <span>Dark</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => setTheme('system')}
                                                    className="gap-2"
                                                >
                                                    <Monitor className="h-4 w-4" />
                                                    <span>System</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <a href="#" className="text-sm hover:text-indigo-400">
                                        Privacy Policy
                                    </a>
                                    <a href="#" className="text-sm hover:text-indigo-400">
                                        Terms of Service
                                    </a>
                                    <a href="#" className="text-sm hover:text-indigo-400">
                                        Cookie Policy
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
