import ApplicationLogo from '@/components/ApplicationLogo';
import FlashMessage from '@/components/flash-message';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 dark:bg-gray-900 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>
            <FlashMessage />
            <div className="mt-6 w-full overflow-hidden sm:max-w-md">{children}</div>
        </div>
    );
}
