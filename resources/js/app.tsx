import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/sonner';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        createRoot(el).render(
            <ThemeProvider defaultTheme="light" storageKey="akira-theme">
                <TooltipProvider>
                    <App {...props} />
                    <Toaster />
                </TooltipProvider>
            </ThemeProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
