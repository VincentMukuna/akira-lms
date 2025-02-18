import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';
import { ArrowLeft, Home } from 'lucide-react';

const illustrations = {
    503: '🔧',
    500: '🛠️',
    404: '🔍',
    403: '🚫',
};

const title = {
    503: '503: Service Unavailable',
    500: '500: Server Error',
    404: '404: Page Not Found',
    403: '403: Forbidden',
};

const description = {
    503: 'Sorry, we are doing some maintenance. Please check back soon.',
    500: 'Whoops, something went wrong on our servers.',
    404: 'Sorry, the page you are looking for could not be found.',
    403: 'Sorry, you are forbidden from accessing this page.',
};

const suggestions = {
    503: [
        'Try refreshing the page',
        'Check back in a few minutes',
        'Contact support if the issue persists',
    ],
    500: [
        'Try refreshing the page',
        'Clear your browser cache',
        'Contact support if the issue persists',
    ],
    404: ['Check the URL for typos', 'Go back to the previous page', 'Navigate to the home page'],
    403: ['Check if you are logged in', 'Verify your permissions', 'Contact your administrator'],
};

export default function ErrorPage({ status }: { status: number }) {
    const handleBack = () => {
        if (window.history.length > 1) {
            router.visit(document.referrer || '/', {
                preserveScroll: true,
                preserveState: true,
            });
        } else {
            router.visit('/');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-2xl">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-6 animate-bounce text-8xl">
                        {illustrations[status as keyof typeof illustrations]}
                    </div>

                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
                        {title[status as keyof typeof title]}
                    </h1>

                    <p className="mb-8 text-lg text-muted-foreground">
                        {description[status as keyof typeof description]}
                    </p>

                    <div className="mb-8 text-left">
                        <h2 className="mb-3 text-lg font-semibold">Try these suggestions:</h2>
                        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                            {suggestions[status as keyof typeof suggestions].map(
                                (suggestion, index) => (
                                    <li key={index}>{suggestion}</li>
                                ),
                            )}
                        </ul>
                    </div>

                    <div className="flex gap-4">
                        <Button onClick={handleBack} variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>
                        <Button asChild>
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                Return Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
