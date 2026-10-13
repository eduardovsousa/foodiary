import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, type ReactNode } from 'react';
import {
  View,
  type DimensionValue,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import {
  baseColors,
  type SkeletonColorMode,
} from './colors';

interface ISkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: number | 'round' | 'square';
  colorMode?: SkeletonColorMode;
  color?: string;
  highlightColor?: string;
  colors?: string[];
  duration?: number;
  backgroundSize?: number;
  show?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  fadeDuration?: number;
}

export function Skeleton({
  width = 100,
  height = 24,
  radius = 6,
  colorMode = 'light',
  color,
  highlightColor,
  duration = 1200,
  show = true,
  children,
  style,
  fadeDuration = 250,
}: ISkeletonProps) {
  const isVisible = show ?? !children;

  const progress = useSharedValue(0);
  const opacity = useSharedValue(isVisible ? 1 : 0);

  const [measuredWidth, setMeasuredWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(isVisible);

  const borderRadius =
    radius === 'round' ? 9999 : radius === 'square' ? 0 : radius;

  const backgroundColor =
    color ?? baseColors[colorMode].primary;

  const handleLayout = (event: LayoutChangeEvent) => {
    setMeasuredWidth(event.nativeEvent.layout.width);
  };

  // Fade-in / fade-out
  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
    }

    opacity.value = withTiming(
      isVisible ? 1 : 0,
      {
        duration: fadeDuration,
        easing: Easing.out(Easing.ease),
      },
      (finished) => {
        if (finished && !isVisible) {
          // O estado React deve ser atualizado na thread JS.
          runOnJS(setIsMounted)(false);
        }
      },
    );

    return () => {
      cancelAnimation(opacity);
    };
  }, [isVisible, fadeDuration, opacity]);

  // Shimmer
  useEffect(() => {
    cancelAnimation(progress);
    progress.value = 0;

    if (isVisible && measuredWidth > 0) {
      progress.value = withRepeat(
        withTiming(1, {
          duration,
          easing: Easing.linear,
        }),
        -1,
        false,
      );
    }

    return () => cancelAnimation(progress);
  }, [isVisible, duration, measuredWidth, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: measuredWidth,
    height: '100%',
    transform: [
      {
        translateX:
          -measuredWidth + measuredWidth * 2 * progress.value,
      },
    ],
  }));

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View
      onLayout={handleLayout}
      style={[
        {
          width,
          height,
          borderRadius,
          overflow: 'hidden',
          backgroundColor: isMounted
            ? backgroundColor
            : undefined,
        },
        style,
      ]}
    >
      {!isVisible && !isMounted && children}

      {isMounted && (
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius,
              overflow: 'hidden',
            },
            fadeStyle,
          ]}
        >
          {measuredWidth > 0 && (
            <Animated.View
              style={[
                animatedStyle,
                {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
              ]}
            >
              <LinearGradient
                colors={[
                  backgroundColor,
                  highlightColor ??
                    (colorMode === 'dark'
                      ? 'rgb(38, 38, 38)'
                      : 'rgb(185, 185, 185)'),
                  backgroundColor,
                ]}
                locations={[0, 0.5, 1]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </Animated.View>
          )}
        </Animated.View>
      )}
    </View>
  );
}
