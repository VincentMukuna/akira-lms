import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useRoleNavigation } from '@/hooks/use-role-navigation';
import { Link } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

export function RoleSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { activeRole, activeNavigation } = useRoleNavigation();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={`/${activeRole}/dashboard`}>
                <div className="flex dark aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GraduationCap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">AkiraLMS</span>
                  <span className="truncate text-xs capitalize">{activeRole} Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={activeNavigation.main} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
