import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import BackButton from '@/components/BackButton';

const HEADER_HEIGHT = 350;

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
  // Optional prop to manually specify bottom padding if needed
  bottomPadding?: number;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  bottomPadding,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  
  // Use safe area insets instead of tab bar overflow
  const insets = useSafeAreaInsets();
  
  // Use custom bottom padding if provided, otherwise use safe area bottom
  const bottom = bottomPadding ?? insets.bottom;
  
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor?.[colorScheme] ?? (colorScheme === 'dark' ? '#000' : '#fff') },
            headerAnimatedStyle,
          ]}>
          {headerImage}
        </Animated.View>
        <ThemedView className="w-full" style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
      
      {/* Back Button positioned on top */}
      <View style={[styles.backButtonContainer, { top: insets.top + 10 }]}>
        <BackButton />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
    width:'100%',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 21,
    gap: 16,
    overflow: 'hidden',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,  
  },
  backButtonContainer: {
    position: 'absolute',
    left: 16,
    zIndex: 1000,
  },
});