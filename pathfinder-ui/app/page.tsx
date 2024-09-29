"use client"
import { ThreeDots } from 'react-loader-spinner';
import styles from './page.module.css';
import Image from 'next/image';
import { position } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {

    setTimeout(() => {
      window.location.href = '/map';
    }, 2000);

  }, []);


  return (
      <main className={styles.main}>
      <div className={styles.img}>
        <Image alt='' src={'/svg/logo.svg'} fill />
      </div>
        <p className={styles.title}>
        Safe Cycler
        </p>
        <div className={styles.gradient}>
          <Image alt='' src={'/svg/gradient.svg'} fill />
        </div>
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="white"
          radius="9"
          wrapperStyle={{position: 'absolute', bottom: '130px'}}
          />
      </main>
  );
}
