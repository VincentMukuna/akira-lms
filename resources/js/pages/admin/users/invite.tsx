import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { Loader2, Plus, Upload } from 'lucide-react';
import { useState } from 'react';
import { useForm as useReactForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const roles = [
    { value: 'admin', label: 'Administrator' },
    { value: 'instructor', label: 'Instructor' },
    { value: 'learner', label: 'Learner' },
] as const;

const inviteFormSchema = z.object({
    email: z.string().email('Invalid email address'),
    role: z.enum(['admin', 'instructor', 'learner'], {
        required_error: 'Please select a role',
    }),
});

type InviteForm = z.infer<typeof inviteFormSchema>;

interface Invite {
    email: string;
    role: string;
}

const InviteUsers = () => {
    const [invites, setInvites] = useState<Invite[]>([]);
    const [isPending, setIsPending] = useState(false);

    const form = useReactForm<InviteForm>({
        resolver: zodResolver(inviteFormSchema),
        defaultValues: {
            email: '',
            role: 'learner',
        },
    });

    const onSubmit = (formData: InviteForm) => {
        // Check for duplicate email
        if (invites.some((invite: Invite) => invite.email === formData.email)) {
            form.setError('email', {
                type: 'manual',
                message: 'This email has already been added',
            });
            return;
        }

        setInvites([...invites, formData]);
        form.reset();
    };

    const removeInvite = (email: string) => {
        setInvites(invites.filter((invite: Invite) => invite.email !== email));
    };

    const handleBulkInvite = () => {
        setIsPending(true);
        router.post(
            route('admin.users.invite.store'),
            { invites },
            {
                onSuccess: () => {
                    setInvites([]);
                    setIsPending(false);
                    toast.success('Processing invites...', {
                        description:
                            "You'll receive a notification when all invites have been processed.",
                    });
                },
                onError: () => {
                    setIsPending(false);
                    toast.error('Failed to process invites', {
                        description: 'Please try again.',
                    });
                },
            },
        );
    };

    return (
        <>
            <Head title="Invite Users" />

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Invite Users</CardTitle>
                        <CardDescription>
                            Invite users to your workspace. They will receive an email with
                            instructions to set up their account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-6">
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="flex gap-4"
                                    >
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="user@example.com"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItem className="w-48">
                                                    <FormLabel>Role</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a role" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {roles.map((role) => (
                                                                <SelectItem
                                                                    key={role.value}
                                                                    value={role.value}
                                                                >
                                                                    {role.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="mt-8">
                                            <Plus className="mr-2 size-4" />
                                            Add User
                                        </Button>
                                    </form>
                                </Form>

                                <div className="flex items-center gap-4">
                                    <Button variant="outline" className="relative" disabled={true}>
                                        <Upload className="mr-2 size-4" />
                                        Import CSV
                                        <Badge
                                            variant="secondary"
                                            className="absolute -right-2 -top-2"
                                        >
                                            Soon
                                        </Badge>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {invites.length > 0 && (
                    <Card>
                        <CardHeader className="flex-row items-center justify-between space-y-0">
                            <CardTitle>Users to Invite ({invites.length})</CardTitle>
                            <Button onClick={handleBulkInvite} disabled={isPending}>
                                {isPending ? (
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                ) : null}
                                Send Invites
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead className="w-24">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {invites.map((invite) => (
                                            <TableRow key={invite.email}>
                                                <TableCell>{invite.email}</TableCell>
                                                <TableCell className="capitalize">
                                                    {invite.role}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeInvite(invite.email)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
};

InviteUsers.layout = (page: any) => (
    <AuthenticatedLayout header="Invite Users">{page}</AuthenticatedLayout>
);

export default InviteUsers;
