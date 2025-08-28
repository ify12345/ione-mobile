import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';


export default function EarningScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    >
      <Collapsible
        title="Earnings"
      >
        <ThemedView className="p-4">
          <ThemedText className="text-lg font-bold">$1,250.00</ThemedText>
          <ThemedText className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            This is your total earnings for the month.
          </ThemedText>
          <ExternalLink href="https://example.com/more-info" className="mt-4">
            Learn more about your earnings
          </ExternalLink>
        </ThemedView>
      </Collapsible>
    </ParallaxScrollView>
  );
}
