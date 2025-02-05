'use client';

import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Monitor, Moon, Sparkles, Sun } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { useMemo } from 'react';
import { useTheme } from './theme-provider';

interface NavUserProps {
    user: {
        name: string;
        email: string;
        avatar: string;
    };
}

export function NavUser({ user }: NavUserProps) {
    const { isMobile } = useSidebar();
    const { theme, setTheme } = useTheme();
    const currentThemeIcon = useMemo(() => {
        switch (theme) {
            case "dark":
                return <Moon className='size-[1.2rem]' />;
            case 'light':
                return <Sun className='size-[1.2rem]'/>;
            case 'system':
                return <Monitor className='size-[1.2rem]' />
            default:
                break;
        }
    }, [theme])

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="rounded-lg">
                                    {user.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.name}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">
                                        {user.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Sparkles className="mr-2 h-4 w-4" />
                                <span>Upgrade to Pro</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck className="mr-2 h-4 w-4" />
                                <span>Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>Billing</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell className="mr-2 h-4 w-4" />
                                <span>Notifications</span>
                            </DropdownMenuItem>   
                            <DropdownMenuSeparator />
                        </DropdownMenuGroup>
                            <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                    {currentThemeIcon}
                                    <span className='ms-2'>Theme</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={()=>setTheme("light")}>
                                        <Sun className="h-[1.2rem] w-[1.2rem]" />
                                        <span className=''>Light</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={()=>setTheme("dark")}>
                                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                                        <span className=''>Dark</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={()=>setTheme("system")}>
                                        <Monitor className="h-[1.2rem] w-[1.2rem]" />
                                        <span className=''>System</span>
                                    </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
