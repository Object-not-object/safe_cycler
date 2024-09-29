import React from 'react';
import dynamic from 'next/dynamic';
const MapComponent = dynamic(
  () => import('@client/components/custom/map-container/MapContainer'),
  {
    ssr: false,
  },
);

export default function page() {
  return (
    <MapComponent />
  )
}
