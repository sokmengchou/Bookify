import AnimatedScale from './AnimatedScale';
import React from 'react'
import { Animated, StyleProp, StyleSheet, TouchableWithoutFeedback, TouchableWithoutFeedbackProps, View, ViewStyle } from 'react-native'


interface Props extends Omit<TouchableWithoutFeedbackProps, "style"> {
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  startSize?: number
  endSize?: number
}
const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(TouchableWithoutFeedback);

const TouchableScale = (props: Props) => {
  const { onPress, startSize, endSize, children, style } = props
  const [zoomInAnimated, ZOOM] = AnimatedScale();

  return (
    <View style={styles.row}>
      <AnimatedTouchableWithoutFeedback
        {...props}
        onPress={onPress}
        onPressIn={() => ZOOM.pressInAnimation(zoomInAnimated)}
        onPressOut={() => ZOOM.pressOutAnimation(zoomInAnimated)}
        style={[ZOOM.getScaleTransformationStyle(zoomInAnimated, startSize, endSize), styles.base]}>
        <View style={style}>
          {children || null}
        </View>
      </AnimatedTouchableWithoutFeedback>
    </View>
  )
}

export default TouchableScale

const styles = StyleSheet.create({
  row: {
  },
  base: {
    alignItems: 'center',
    justifyContent: 'center'
  },
});
