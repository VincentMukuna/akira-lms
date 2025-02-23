<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Tenant;
use Illuminate\Console\Command;

class DeleteTenantCommand extends Command
{
    protected $signature = 'tenant:delete {id}';

    protected $description = 'Delete a tenant and its associated database';

    public function handle(): int
    {
        $id = $this->argument('id');

        $tenant = Tenant::find($id);

        if (! $tenant) {
            $this->error("Tenant with ID '{$id}' not found.");

            return parent::FAILURE;
        }

        if (! $this->confirm("Are you sure you want to delete tenant '{$id}' and all its data?")) {
            return parent::FAILURE;
        }

        $this->info("Deleting tenant '{$id}'...");

        // The tenant deletion will cascade to domains and delete the database
        $tenant->delete();

        $this->info('Tenant deleted successfully!');

        return parent::SUCCESS;
    }
}
