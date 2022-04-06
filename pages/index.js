import { useEffect } from 'react';
import { useRouter } from 'next/router';
import localStorage from 'localStorage';
//custom components
import Hero from '../components/hero';

export default function Home() {
  const router = useRouter();
  useEffect(()=>{
    const visited = localStorage.getItem("visited");
    if(!visited){
      localStorage.setItem("visited", true);
    }else if(visited){
      router.push("/profile");
    }
  },[])
  return (
    <main>
      <Hero />
    </main>
  )
}
