import { DataPagination, PaginatedData } from '@/components/data-pagination';
import { SearchFilter } from '@/components/filters/search-filter';
import { SelectFilter } from '@/components/filters/select-filter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { FiltersProvider, useFilters, type Filters } from '@/contexts/filters-context';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Clock, UserCheck, UserPlus, Users } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    created_at: string;
}

interface Stats {
    total_users: number;
    active_users: number;
    new_users_this_month: number;
    pending_invitations: number;
}

interface Props {
    users: PaginatedData<User>;
    stats: Stats;
    filters: Filters;
    availableRoles: string[];
}

function UsersTable({
    users,
    availableRoles,
}: {
    users: PaginatedData<User>;
    availableRoles: string[];
}) {
    const { filters, updateFilter } = useFilters();

    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle>Users</CardTitle>
                <div className="flex items-center gap-4">
                    <SearchFilter
                        value={filters.search ?? ''}
                        onChange={(value) => updateFilter('search', value)}
                        placeholder="Search users..."
                        className="w-[300px]"
                    />
                    <SelectFilter
                        value={filters.role ?? ''}
                        onChange={(value) => updateFilter('role', value)}
                        options={availableRoles.map((role) => ({ label: role, value: role }))}
                        placeholder="Filter by role"
                        className="w-[200px]"
                    />
                    <Link href={route('admin.users.invite')}>
                        <Button>
                            <UserPlus className="mr-2 size-4" />
                            Invite Users
                        </Button>
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {user.roles.map((role, index) => (
                                                <span
                                                    key={role}
                                                    className="mr-1 inline-block rounded bg-primary/10 px-2 py-1 text-xs capitalize"
                                                >
                                                    {role}
                                                    {index < user.roles.length - 1 ? ' ' : ''}
                                                </span>
                                            ))}
                                        </TableCell>
                                        <TableCell>{user.created_at}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="sm">
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <DataPagination paginated={users} />
                </div>
            </CardContent>
        </Card>
    );
}

const UsersIndex = ({ users, stats, filters: initialFilters, availableRoles }: Props) => {
    return (
        <FiltersProvider initialFilters={initialFilters} routeName="admin.users.index">
            <Head title="Users" />

            <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total_users}</div>
                        <p className="text-xs text-muted-foreground">All registered users</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.active_users}</div>
                        <p className="text-xs text-muted-foreground">Verified users</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New This Month</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.new_users_this_month}</div>
                        <p className="text-xs text-muted-foreground">Users joined this month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pending_invitations}</div>
                        <p className="text-xs text-muted-foreground">Awaiting acceptance</p>
                    </CardContent>
                </Card>
            </div>

            <UsersTable users={users} availableRoles={availableRoles} />
        </FiltersProvider>
    );
};

UsersIndex.layout = (page: any) => <AuthenticatedLayout header="Users">{page}</AuthenticatedLayout>;

export default UsersIndex;
