import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import lotties from '../modules/lotties';
import modules from '../modules';
import _styles from '../_styles';

interface Props { }

export default (props: Props) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={lotties.BOOKS}
        style={{ width: modules.VIEW_PORT_WIDTH / 2 }}
        autoPlay
        loop
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    ..._styles.containerPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:modules.BODY_HORIZONTAL_24 * 4
  }
});
