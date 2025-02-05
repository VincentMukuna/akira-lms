import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export default function ErrorPage({ status }: { status: number }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status];

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status];

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="w-full max-w-md px-6 text-center">
                <div className="mb-8">
                    {/* Error illustration - using emojis as placeholders, you might want to replace with actual SVG illustrations */}
                    <div className="mb-4 text-8xl">
                        {status === 404
                            ? '🔍'
                            : status === 500
                              ? '🛠️'
                              : status === 503
                                ? '🔧'
                                : '🚫'}
                    </div>
                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
                        {title}
                    </h1>
                    <p className="mb-8 text-lg text-muted-foreground">{description}</p>
                    <div className="flex justify-center gap-4">
                        <Button asChild>
                            <Link href="/">Return Home</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link
                                href={window.history.length > 2 ? '#' : '/'}
                                onClick={() => window.history.length > 2 && window.history.back()}
                            >
                                Go Back
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
