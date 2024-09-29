import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SafeCycler',
    short_name: 'SC',
    description: 'PWA for SafeCycler',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icons/bike-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/bike-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
