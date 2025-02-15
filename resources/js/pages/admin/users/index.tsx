import { DataPagination, PaginatedData } from '@/components/data-pagination';
import { DateRangeFilter } from '@/components/filters/date-range-filter';
import { SearchFilter } from '@/components/filters/search-filter';
import { SelectFilter } from '@/components/filters/select-filter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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
import { format } from 'date-fns';
import { Calendar, Clock, SlidersHorizontal, UserCheck, UserPlus, Users, X } from 'lucide-react';

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

function FiltersSheet({ availableRoles }: { availableRoles: string[] }) {
    const { filters, dateRange, updateFilter, updateDateRange } = useFilters();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="h-10">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Filter Users</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                    <div className="space-y-2">
                        <Label>Search</Label>
                        <SearchFilter
                            value={filters.search ?? ''}
                            onChange={(value) => updateFilter('search', value)}
                            placeholder="Search users..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Role</Label>
                        <SelectFilter
                            value={filters.role ?? ''}
                            onChange={(value) => updateFilter('role', value)}
                            options={availableRoles.map((role) => ({ label: role, value: role }))}
                            placeholder="Filter by role"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Join Date</Label>
                        <DateRangeFilter
                            value={dateRange}
                            onChange={updateDateRange}
                            placeholder="Filter by join date"
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

function ActiveFilters() {
    const { filters, dateRange, updateFilter, updateDateRange } = useFilters();
    const hasFilters = filters.search || filters.role || dateRange;

    if (!hasFilters) return null;

    return (
        <div className="mb-4 flex flex-wrap gap-2">
            {filters.search && (
                <Badge variant="secondary" className="gap-1">
                    Search: {filters.search}
                    <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => updateFilter('search', '')}
                    />
                </Badge>
            )}
            {filters.role && (
                <Badge variant="secondary" className="gap-1">
                    Role: {filters.role}
                    <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => updateFilter('role', '')}
                    />
                </Badge>
            )}
            {dateRange && (
                <Badge variant="secondary" className="gap-1">
                    Joined: {format(dateRange.from!, 'MMM d')}
                    {dateRange.to && ` - ${format(dateRange.to, 'MMM d')}`}
                    <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => updateDateRange(undefined)}
                    />
                </Badge>
            )}
        </div>
    );
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
                    <FiltersSheet availableRoles={availableRoles} />
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
                    <ActiveFilters />
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
