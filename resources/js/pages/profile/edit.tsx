import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './partials/DeleteUserForm';
import UpdatePasswordForm from './partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './partials/UpdateProfileInformationForm';

const Edit = ({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) => {
    return (
        <>
            <Head title="Profile" />

            <div className="grid max-w-4xl grid-cols-1 gap-6">
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className=""
                />

                <UpdatePasswordForm className="" />

                <DeleteUserForm className="" />
            </div>
        </>
    );
};

Edit.layout = (page: any) => <AuthenticatedLayout header="Profile">{page}</AuthenticatedLayout>;

export default Edit;
