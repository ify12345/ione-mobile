
import { logout } from '@/redux/reducers/auth';
import store, { persistor } from '@/redux/store';
import { router } from 'expo-router';

export async function handleLogout() {
  try {
    // Clear Redux state
    store.dispatch(logout());
    // Purge persisted store
    await persistor.purge();
    // Redirect to onboarding/signin
    router.replace('/(onboarding)/signin');
  } catch (error) {
    console.log('Logout failed:', error);
  }
}
