import { Animated } from 'react-native';

type output = Animated.Value
type input = {
  getScaleTransformationStyle(animated: Animated.Value, startSize?: number, endSize?: number): {
    transform: {
      scale: Animated.AnimatedInterpolation;
    }[];
  },
  pressInAnimation(animated: Animated.Value, duration?: number): void,
  pressOutAnimation(animated: Animated.Value, duration?: number): void
}

export default function AnimatedScale(): [output, input] {
  const zoomInAnimated = new Animated.Value(0);
  const ZOOM = {
    getScaleTransformationStyle(animated: Animated.Value, startSize = 1, endSize = 0.95) {
      const interpolation = animated.interpolate({
        inputRange: [0, 1],
        outputRange: [startSize, endSize],
      });
      return {
        transform: [{ scale: interpolation }],
      };
    },
    pressInAnimation(animated: Animated.Value, duration = 150) {
      Animated.timing(animated, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    },
    pressOutAnimation(animated: Animated.Value, duration = 150) {
      Animated.timing(animated, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start();
    },
  };
  return [zoomInAnimated, ZOOM];
}
