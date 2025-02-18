<?php

namespace App\Domain\Workspace\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\Validation\Regex;
use Spatie\LaravelData\Attributes\Validation\Max;

class WorkspaceCreateData extends Data
{
    public function __construct(
        #[Required, StringType, Max(255)]
        public string $company_name,

        #[Required, StringType, Regex('/^[a-z0-9-]+$/'), Max(63)]
        public string $subdomain,

        #[Required, Email, Max(255)]
        public string $admin_email,
    ) {}

    public static function rules(\Spatie\LaravelData\Support\Validation\ValidationContext $context): array
    {
        return [
            'company_name' => ['required', 'string', 'max:255'],
            'subdomain' => [
                'required',
                'string',
                'max:63',
                'regex:/^[a-z0-9-]+$/',
                'not_in:www,admin,api,mail,smtp,pop,imap', // Reserved subdomains
            ],
            'admin_email' => [
                'required',
                'string',
                'email:rfc,dns',
                'max:255',
                // Uncomment to restrict to business emails only
                // 'not_regex:/\@(gmail|yahoo|hotmail|outlook)\./i',
            ],
        ];
    }
}
