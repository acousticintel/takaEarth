import { getProviders, signIn as SignInProvider, useSession } from 'next-auth/react'
import Image from 'next/image';

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  }
}

export default function SignIn({ providers }) {
  return (
    <div className='signIn-page'>
      <div className='flex flex-col h-full justify-center items-center'>
        <div className='h-60 w-40 mt-10 rounded-lg overflow-hidden relative'>
          <Image src='/assets/logo.png' alt='Taka' layout='fill' />
        </div>
        <span className='uppercase text-gray-800 mt-3 font-bold text-2xl'>Taka</span>
        {providers && Object.values(providers).map((provider) => (
          <div key={provider.name} className='mt-6'>
            <button
              onClick={() => SignInProvider(provider.id, { callbackUrl: '/profile' })}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
