import { useEffect } from 'react';
import { useRouter } from 'next/router';
import localforage from "localforage";
//custom components
import Hero from '../components/hero';

export default function Home() {
  const router = useRouter();

  useEffect(()=>{
    const visited = localforage.getItem("visited");
    if(!visited){
      localforage.setItem("visited", true);
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
