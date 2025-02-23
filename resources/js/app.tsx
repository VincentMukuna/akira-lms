import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/sonner';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
        },
    },
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
         if (import.meta.env.SSR) {
            hydrateRoot(el,
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider defaultTheme="light" storageKey="akira-theme">
                        <App {...props} />
                        <Toaster />
                    </ThemeProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>,
            );
            return;
        }
        createRoot(el).render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider defaultTheme="light" storageKey="akira-theme">
                    <TooltipProvider>
                        <App {...props} />
                        <Toaster />
                    </TooltipProvider>
                </ThemeProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
