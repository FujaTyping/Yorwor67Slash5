import type { MetadataRoute } from 'next'

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Yorwor67Slash5',
        short_name: 'SMT',
        description: 'A platform for managing class activities, attendance, and assignments for M.5/5 SMT',
        start_url: '/assignment',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0a0a0a',
        icons: [
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}