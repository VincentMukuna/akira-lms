import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import GuestLayout from '@/layouts/guest-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useCallback, useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        company_name: '',
        subdomain: '',
    });

    const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(null);
    const [checking, setChecking] = useState(false);

    const checkSubdomainAvailability = useCallback(async (subdomain: string) => {
        if (!subdomain) {
            setSubdomainAvailable(null);
            return;
        }

        setChecking(true);
        try {
            const response = await fetch(`/api/check-subdomain/${subdomain}`);
            const data = await response.json();
            setSubdomainAvailable(data.available);
        } catch (error) {
            setSubdomainAvailable(false);
        }
        setChecking(false);
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
        post(route('register.tenant'));
    };

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

                        <div className="flex items-center justify-between pt-4">
                            <Link
                                href={route('login')}
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
