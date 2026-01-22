import React, { useEffect, useRef } from 'react';
import Toast from 'react-native-toast-message';
import { useNavigation,NavigationContainerRef } from '@react-navigation/native';


export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export const ToastManager: React.FC = () => {
  const navigation = useNavigation();
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Hide toast when navigation state changes
    const unsubscribe = navigation.addListener('state', () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      
      // Hide any visible toast
      Toast.hide();
    });

    return unsubscribe;
  }, [navigation]);

  return null; // This component doesn't render anything
};