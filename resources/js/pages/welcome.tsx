import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="AkiraLMS - AI-Powered Learning Management System" />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
                {/* Navigation */}
                <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md dark:bg-black/80">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                    Akira<span className="text-gray-800 dark:text-white">LMS</span>
                                </span>
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
                                <img
                                    src="https://ik.imagekit.io/pibjyepn7p9/Blade_UI_Kit_JQT13ElOXlw.jpg"
                                    alt="Platform Interface"
                                    className="rounded-2xl shadow-xl ring-1 ring-gray-900/10"
                                />
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

                {/* Footer */}
                <footer className="bg-gray-50 dark:bg-gray-900">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="flex justify-between">
                            <p className="text-base text-gray-500 dark:text-gray-400">
                                © {new Date().getFullYear()} AkiraLMS. All rights reserved.
                            </p>
                            <div className="flex space-x-6">
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Terms of Service
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
