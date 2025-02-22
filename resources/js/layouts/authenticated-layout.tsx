import FlashMessage from '@/components/flash-message';
import { RoleSidebar } from '@/components/role-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import React from 'react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface Props {
    children: React.ReactNode;
    header: string | {
        items: BreadcrumbItem[];
    };
}

export default function AuthenticatedLayout({ children, header }: Props) {
    const renderHeader = () => {
        if (typeof header === 'string') {
            return (
                <div className="flex items-center">
                    <h1 className="text-lg font-medium">{header}</h1>
                </div>
            );
        }

        return (
            <Breadcrumb>
                <BreadcrumbList>
                    {header.items.map((item, index) => {
                        const isLast = index === header.items.length - 1;

                        return (
                            <React.Fragment key={item.label}>
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink
                                            asChild
                                        >
                                            <Link href={item.href!}>{item.label}</Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!isLast && <BreadcrumbSeparator />}
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        );
    };

    return (
        <SidebarProvider>
            <RoleSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 ">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        {renderHeader()}
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-6 p-6 pt-0">{children}</main>
                <FlashMessage />
            </SidebarInset>
        </SidebarProvider>
    );
}
