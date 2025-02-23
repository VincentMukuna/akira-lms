<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateTenantCommand extends Command
{
    protected $signature = 'tenant:create {id} {domain?}';

    protected $description = 'Create a new tenant with a domain and test user';

    public function handle(): int
    {
        $id = $this->argument('id');
        $domain = $this->argument('domain') ?? $id.'.localhost';

        $this->info('Creating tenant...');

        // Create tenant
        $tenant = Tenant::create(['id' => $id]);

        // Create domain
        $tenant->domains()->create(['domain' => $domain]);

        // Create test user for the tenant
        $tenant->run(function () {
            User::create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]);
        });

        $this->info('Tenant created successfully!');
        $this->info("Tenant ID: {$id}");
        $this->info("Domain: {$domain}");
        $this->info('Test user created with:');
        $this->info('Email: test@example.com');
        $this->info('Password: password');

        return parent::SUCCESS;
    }
}
