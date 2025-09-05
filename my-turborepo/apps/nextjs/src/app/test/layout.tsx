'use client';
import { authClient } from '@vanni/auth/client';
import { useAuthRedirect } from '~/app/_components/auth/useAuthRedirect';

function Layout() {
  const { session, setSession } = useAuthRedirect();
  async function signOutHandler() {
    try {
      await authClient.signOut();
      setSession(null);
      console.log('Sign-out successful');
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  }

  return (
    <div className='m-48'>
      <p>hello {session?.user?.name ?? 'Guest'}</p>
      <button onClick={signOutHandler} className='btn-secondary'>
        Sign Out
      </button>
    </div>
  );
}

export default Layout