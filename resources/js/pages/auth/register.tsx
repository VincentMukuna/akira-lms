import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import GuestLayout from '@/layouts/guest-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import { FormEventHandler, useCallback, useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: '',
        subdomain: '',
        admin_email: '',
    });

    const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(null);
    const [checking, setChecking] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const checkSubdomainAvailability = useCallback(async (subdomain: string) => {
        if (!subdomain) {
            setSubdomainAvailable(null);
            return;
        }

        setChecking(true);
        try {
            const { data } = await axios.get<{ available: boolean }>(
                route('register.check-subdomain', subdomain),
            );
            setSubdomainAvailable(data.available);
        } catch (error) {
            setSubdomainAvailable(false);
        } finally {
            setChecking(false);
        }
    }, []);

    const debouncedCheck = useDebouncedCallback(checkSubdomainAvailability);

    // Handle subdomain change
    const handleSubdomainChange = (value: string) => {
        // Convert to lowercase and remove special characters
        const sanitized = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
        setData('subdomain', sanitized);
        debouncedCheck(sanitized);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register.workspace'), {
            onSuccess: () => {
                setSubmitted(true);
                reset();
            },
        });
    };

    if (submitted) {
        return (
            <GuestLayout>
                <Head title="Registration Successful" />

                <Card className="w-full max-w-xl">
                    <CardHeader>
                        <CardTitle>Workspace Created Successfully! 🎉</CardTitle>
                        <CardDescription>
                            We've sent setup instructions to {data.admin_email}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Please check your inbox to complete your admin account setup. The email
                            should arrive within a few minutes.
                        </p>

                        <div className="rounded-lg bg-muted p-4">
                            <p className="font-medium">What happens next?</p>
                            <ol className="ml-4 mt-2 list-decimal text-sm text-muted-foreground">
                                <li>Check your email for setup instructions</li>
                                <li>Click the setup link in the email</li>
                                <li>Create your admin account</li>
                                <li>Start building your learning platform!</li>
                            </ol>
                        </div>

                        <div className="flex items-center justify-between">
                            <Button variant="outline" onClick={() => setSubmitted(false)}>
                                Register Another Workspace
                            </Button>
                            <Link
                                href={route('home')}
                                className="text-sm text-primary underline hover:text-primary/90"
                            >
                                Back to Homepage
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </GuestLayout>
        );
    }

    return (
        <GuestLayout>
            <Head title="Register Your Company" />

            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle>Register Your Company</CardTitle>
                    <CardDescription>
                        Create your organization's learning platform in minutes.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="company_name">Company Name</Label>
                            <Input
                                id="company_name"
                                name="company_name"
                                value={data.company_name}
                                onChange={(e) => setData('company_name', e.target.value)}
                                autoComplete="organization"
                                autoFocus
                                required
                                placeholder="Acme Inc."
                            />
                            {errors.company_name && (
                                <p className="text-sm text-red-500">{errors.company_name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subdomain">Choose Your Domain</Label>
                            <div className="flex items-center space-x-2">
                                <div className="relative flex-1">
                                    <Input
                                        id="subdomain"
                                        name="subdomain"
                                        value={data.subdomain}
                                        onChange={(e) => handleSubdomainChange(e.target.value)}
                                        required
                                        placeholder="your-company"
                                        className={
                                            subdomainAvailable === true
                                                ? 'border-green-500'
                                                : subdomainAvailable === false
                                                  ? 'border-red-500'
                                                  : ''
                                        }
                                    />
                                    {checking && (
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                            Checking...
                                        </span>
                                    )}
                                </div>
                                <span className="text-sm text-gray-500">.akiralms.com</span>
                            </div>
                            {errors.subdomain && (
                                <p className="text-sm text-red-500">{errors.subdomain}</p>
                            )}
                            {subdomainAvailable === true && (
                                <p className="text-sm text-green-500">Domain is available!</p>
                            )}
                            {subdomainAvailable === false && !errors.subdomain && (
                                <p className="text-sm text-red-500">Domain is not available</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="admin_email">Admin Email</Label>
                            <Input
                                id="admin_email"
                                type="email"
                                name="admin_email"
                                value={data.admin_email}
                                onChange={(e) => setData('admin_email', e.target.value)}
                                required
                                placeholder="admin@company.com"
                            />
                            {errors.admin_email && (
                                <p className="text-sm text-red-500">{errors.admin_email}</p>
                            )}
                            <p className="text-sm text-muted-foreground">
                                We'll send setup instructions to this email address.
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <Link
                                href={route('workspace.access')}
                                className="text-sm text-primary underline hover:text-primary/90"
                            >
                                Already have an account?
                            </Link>

                            <Button
                                type="submit"
                                disabled={processing || subdomainAvailable === false || checking}
                            >
                                Create Workspace
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
