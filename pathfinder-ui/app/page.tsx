import styles from './page.module.css';
import dynamic from 'next/dynamic';
const MapComponent = dynamic(
  () => import('@client/components/custom/map-container/MapContainer'),
  {
    ssr: false,
  },
);

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Hello World!</h2>
      </main>
      <MapComponent />
    </div>
  );
}
