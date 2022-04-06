import { useSession } from 'next-auth/react';
import Router from 'next/router'
import { useEffect } from 'react'

export function AuthGuard({ children }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    const { pathname } = Router; 
    if (status !== "loading" && status === "unauthenticated") {
      //auth is initialized and there is no user
      if (!session) {
        // redirect
        Router.push("/auth/signin");
      }else{
        Router.push(pathname);
      }
    }
  }, [status, Router, session]);

  /* show loading indicator while the auth provider is still initializing */
  if (status === 'loading') {
    return <div className="w-full h-screen flex justify-center items-center">
      <h1>Need to Sign In to view this Page.</h1>
    </div>;
  }

  // if auth initialized with a valid user show protected page
  if (status !== 'loading' && session) {
    return <>{children}</>
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null
}