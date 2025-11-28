/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';

import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedText } from '@/components/ThemedText';

type ToastProps = {
  title?: string;
  message: string;
  icon?: ReactNode;
};

const toastConfig = {
  error: ({props}: {props: ToastProps}) => (
    <View style={[styles.toast, styles.errorToast]}>
      {props.icon || (
        <View style={[styles.iconWrapper, styles.errorIconWrapper]}>
          <AntDesign name="exclamation" size={24} color="#FFFFFF" />
        </View>
      )}
      <View style={styles.details}>
        {props.title && (
          <ThemedText lightColor='#991B1B' darkColor='#991B1B' style={styles.errorTitle}>
            {props.title}
          </ThemedText>
        )}
        <ThemedText lightColor='#7F1D1D' darkColor='#7F1D1D' style={[styles.msg, styles.errorMsg]}>
          {props.message}
        </ThemedText>
      </View>
    </View>
  ),
  success: ({props}: {props: ToastProps}) => (
    <View style={[styles.toast, styles.successToast]}>
      {props.icon || (
        <View style={[styles.iconWrapper, styles.successIconWrapper]}>
          <Feather name="check" size={24} color="#FFFFFF" />
        </View>
      )}
      <View style={styles.details}>
        {props.title && (
          <ThemedText lightColor='#065F46' darkColor='#065F46' style={styles.successTitle}>
            {props.title}
          </ThemedText>
        )}
        <ThemedText lightColor='#064E3B' darkColor='#064E3B' style={[styles.msg, styles.successMsg]}>
          {props.message}
        </ThemedText>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    width: '89%',
    borderRadius: 8,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorToast: {
    backgroundColor: '#FEE2E2', // Light red background
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626', // Red border
  },
  successToast: {
    backgroundColor: '#D1FAE5', // Light green background
    borderLeftWidth: 4,
    borderLeftColor: '#00FF94', // Your brand green
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorIconWrapper: {
    backgroundColor: '#DC2626', // Red
  },
  successIconWrapper: {
    backgroundColor: '#00FF94', // Your brand green
  },
  details: {
    marginLeft: 12,
    flex: 1,
  },
  errorTitle: {
    color: '#991B1B', // Dark red
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 2,
  },
  successTitle: {
    color: '#065F46', // Dark green
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 2,
  },
  msg: {
    fontSize: 14,
  },
  errorMsg: {
    color: '#7F1D1D', // Darker red for message
  },
  successMsg: {
    color: '#064E3B', // Darker green for message
  },
});

export default toastConfig;