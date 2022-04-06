import { useEffect } from 'react';
import { useRouter } from 'next/router';
import localStorage from 'localStorage';
//custom components
import Hero from '../components/hero';

export default function Home() {
  const router = useRouter();
  
  return (
    <main>
      <Hero />
    </main>
  )
}
