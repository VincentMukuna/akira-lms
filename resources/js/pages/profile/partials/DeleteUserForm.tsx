import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }: { className?: string }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>
                    Once your account is deleted, all of its resources and data will be permanently
                    deleted. Before deleting your account, please download any data or information
                    that you wish to retain.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Button variant="destructive" onClick={confirmUserDeletion}>
                    Delete Account
                </Button>

                <Dialog open={confirmingUserDeletion} onOpenChange={setConfirmingUserDeletion}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                            <DialogDescription>
                                Once your account is deleted, all of its resources and data will be
                                permanently deleted. Please enter your password to confirm you would
                                like to permanently delete your account.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={deleteUser} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="sr-only">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            <DialogFooter>
                                <Button variant="outline" onClick={closeModal} type="button">
                                    Cancel
                                </Button>
                                <Button variant="destructive" disabled={processing} type="submit">
                                    Delete Account
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
