# Akira LMS

Laravel 11 + Inertia.js + React application using Laravel Sail for local development.

## Requirements

- Docker Desktop
- Composer
- Node.js and npm

If Composer is not installed, follow the [official Composer installation guide](https://getcomposer.org/download/).
If Node.js/npm is not installed, follow the [official npm installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Quick Start

1. Install PHP dependencies:

```bash
composer install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Start the Sail containers:

```bash
./vendor/bin/sail up -d --build
```

4. Install JavaScript dependencies in Sail:

```bash
./vendor/bin/sail npm install
```

5. Generate application key and run migrations:

```bash
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
```

6. Open the app:

- App: [http://localhost](http://localhost)
- Mailpit: [http://localhost:8025](http://localhost:8025)

## Local Development Workflow

Use two terminals during development:

1. Start Sail services:

```bash
./vendor/bin/sail up -d
```

2. Start the Vite dev server:

```bash
./vendor/bin/sail npm run dev
```

To stop Vite, press `Ctrl + C` in its terminal.

To stop all Sail services:

```bash
./vendor/bin/sail down
```
