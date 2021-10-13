import { BlurView, VibrancyViewProperties } from '@react-native-community/blur'
import React, { ReactNode } from 'react'
import { StyleSheet, Platform, View, ViewProps } from 'react-native'

interface Props extends VibrancyViewProperties, ViewProps {
  children?: ReactNode
  androidBackground?: string
}

const BlurAndView = (props: Props) => {
  const android = Platform.OS === 'android'
  if (android) {
    return (
      <View {...props} style={[props.style, props.androidBackground ? { backgroundColor: props.androidBackground } : {}]}>
        {props.children}
      </View>
    )
  }
  return (
    <BlurView {...props}>
      {props.children}
    </BlurView>
  )
}

export default BlurAndView

const styles = StyleSheet.create({})
