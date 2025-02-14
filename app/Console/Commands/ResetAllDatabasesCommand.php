<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Tenant;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ResetAllDatabasesCommand extends Command
{
    protected $signature = 'db:reset-all';
    protected $description = 'Delete all tenant databases, tenant records, and refresh the main database';

    public function handle(): int
    {
        if (!app()->environment('local')) {
            $this->error('This command can only be run in the local environment!');
            return parent::FAILURE;
        }

        if (!$this->confirm('This will delete ALL tenant databases and records. Are you sure you want to continue?')) {
            return parent::FAILURE;
        }

        $this->info('Starting database reset process...');

        // Step 1: Delete all tenant databases
        $this->info('Deleting tenant databases...');
        $tenants = Tenant::all();

        foreach ($tenants as $tenant) {
            $this->info("Deleting database for tenant: {$tenant->id}");


            // Delete the tenant record
            $tenant->delete();
        }

        $this->info('All tenant databases and records deleted.');

        // Step 2: Refresh the main database
        $this->info('Refreshing main database...');
        $this->call('migrate:fresh', [
            '--force' => true,
            '--seed' => true
        ]);

        $this->info('Main database refreshed successfully.');
        $this->info('Database reset process completed!');

        return parent::SUCCESS;
    }
}
