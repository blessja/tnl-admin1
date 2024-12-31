import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import store from '../Store/Store';

type RootState = ReturnType<typeof store.getState>;

export const useAuthRedirect = (): void => {
  const router = useRouter();

  // Access isAuthenticated from the Redux state
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (typeof isAuthenticated === 'boolean') {
      if (isAuthenticated) {
        // Redirect to home if authenticated
        router.push('/');
      } else {
        // Redirect to login if not authenticated
        router.push('/auth/login');
      }
    }
  }, [isAuthenticated, router]);
};
