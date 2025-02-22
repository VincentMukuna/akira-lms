import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head } from '@inertiajs/react';

const Settings = () => {
    return (
        <>
            <Head title="Settings" />

            <div className="grid max-w-4xl grid-cols-1 gap-6">
                {/* Notification Preferences */}
                <Card>
                    <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>
                            Manage how you receive notifications about your courses, assignments, and platform updates.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between space-y-2">
                            <div>
                                <Label>Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive notifications about course updates via email
                                </p>
                            </div>
                            <Switch />
                        </div>

                        <div className="flex items-center justify-between space-y-2">
                            <div>
                                <Label>Assignment Reminders</Label>
                                <p className="text-sm text-muted-foreground">
                                    Get reminders about upcoming assignment deadlines
                                </p>
                            </div>
                            <Switch />
                        </div>

                        <div className="flex items-center justify-between space-y-2">
                            <div>
                                <Label>Course Announcements</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive notifications about course announcements
                                </p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>
                            Customize how the learning platform looks for you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Theme</Label>
                            <Select defaultValue="system">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center justify-between space-y-2">
                            <div>
                                <Label>Reduce Animations</Label>
                                <p className="text-sm text-muted-foreground">
                                    Minimize motion for better accessibility
                                </p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                {/* Language Preferences */}
                <Card>
                    <CardHeader>
                        <CardTitle>Language & Region</CardTitle>
                        <CardDescription>
                            Choose your preferred language and regional settings.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Display Language</Label>
                            <Select defaultValue="en">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Español</SelectItem>
                                    <SelectItem value="fr">Français</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Time Zone</Label>
                            <Select defaultValue="utc">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select time zone" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="utc">UTC</SelectItem>
                                    <SelectItem value="est">Eastern Time (ET)</SelectItem>
                                    <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end space-x-4">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                </div>
            </div>
        </>
    );
};

Settings.layout = (page: any) => <AuthenticatedLayout header="Settings">{page}</AuthenticatedLayout>;

export default Settings;
