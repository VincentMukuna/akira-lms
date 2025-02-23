import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCountdown } from '@/hooks/use-countdown';
import GuestLayout from '@/layouts/guest-layout';
import { Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import { GraduationCap } from 'lucide-react';
import { useState } from 'react';

interface RedirectState {
    isOpen: boolean;
    url: string;
    companyName: string;
}

export default function Access() {
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [redirectState, setRedirectState] = useState<RedirectState>({
        isOpen: false,
        url: '',
        companyName: '',
    });

    const { data, setData, setError, errors, clearErrors } = useForm({
        subdomain: '',
    });

    const { timeLeft, start, cancel } = useCountdown({
        seconds: 10,
        onComplete: () => {
            if (redirectState.url && isValidUrl(redirectState.url)) {
                window.location.href = redirectState.url;
            }
        },
        onCancel: () => {
            setRedirectState((prev) => ({ ...prev, isOpen: false }));
            setIsRedirecting(false);
        },
    });

    // Validate URL helper function
    function isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        clearErrors();
        setIsRedirecting(true);

        try {
            const response = await axios.post(route('workspace.access.store'), data, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            const { redirect_url, company_name } = response.data;

            // Validate the URL before setting state
            if (!redirect_url || !isValidUrl(redirect_url)) {
                setError('subdomain', 'Invalid redirect URL received from server.');
                setIsRedirecting(false);
                return;
            }

            setRedirectState({
                isOpen: true,
                url: redirect_url,
                companyName: company_name || 'Unknown',
            });
            start();
        } catch (error: any) {
            setIsRedirecting(false);
            console.error('Error details:', {
                response: error.response,
                status: error.response?.status,
                data: error.response?.data,
            });

            if (error.response?.data?.errors) {
                const serverErrors = error.response.data.errors;
                if ('subdomain' in serverErrors) {
                    setError('subdomain', serverErrors.subdomain);
                }
            } else if (error.response?.status === 419) {
                // CSRF token mismatch
                setError('subdomain', 'Session expired. Please refresh the page and try again.');
            } else {
                setError('subdomain', 'An error occurred while processing your request.');
            }
        }
    }

    return (
        <GuestLayout>
            <AlertDialog
                open={redirectState.isOpen}
                onOpenChange={(open) => {
                    if (!open) cancel();
                    setRedirectState((prev) => ({ ...prev, isOpen: open }));
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Redirecting to Workspace</AlertDialogTitle>
                        <AlertDialogDescription>
                            You will be redirected to {redirectState.companyName}'s workspace in{' '}
                            {timeLeft} seconds. Click continue to proceed now or cancel to stay on
                            this page.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={cancel}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (redirectState.url && isValidUrl(redirectState.url)) {
                                    window.location.href = redirectState.url;
                                }
                            }}
                        >
                            Continue ({timeLeft}s)
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Card className="w-full">
                <CardHeader className="space-y-1">
                    <div className="mb-4 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                            <GraduationCap className="h-6 w-6 text-primary-foreground" />
                        </div>
                    </div>
                    <CardTitle className="text-center text-2xl">Access Your Workspace</CardTitle>
                    <CardDescription className="text-center">
                        Enter your workspace domain to access your learning platform
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-8">
                        <div className="space-y-2">
                            <Label htmlFor="subdomain">Workspace Domain</Label>
                            <div className="space-y-2">
                                <Input
                                    id="subdomain"
                                    type="text"
                                    value={data.subdomain}
                                    onChange={(e) => setData('subdomain', e.target.value)}
                                    className={errors.subdomain ? 'border-destructive' : ''}
                                    placeholder="your-workspace.akira.com or custom.domain"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Enter either your workspace subdomain (e.g., your-workspace) or
                                    your custom domain
                                </p>
                            </div>
                            {errors.subdomain && (
                                <p className="text-sm text-destructive">{errors.subdomain}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full" disabled={isRedirecting}>
                            {isRedirecting ? 'Redirecting...' : 'Continue to Login'}
                        </Button>
                    </form>
                </CardContent>
                <div className="px-6 pb-6 text-center text-sm text-muted-foreground">
                    Don't have a workspace yet?{' '}
                    <Link
                        href={route('register')}
                        className="font-medium text-primary hover:underline"
                    >
                        Create your workspace
                    </Link>
                </div>
            </Card>
        </GuestLayout>
    );
}
