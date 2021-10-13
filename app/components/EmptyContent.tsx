import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import lotties from '../modules/lotties';
import modules from '../modules';
import { fontGeorgiaBold } from '../../functions/customFont';
import Lottie from 'lottie-react-native'

interface Props {
  title?: any,
  note?: any;
  lottie?: any
}

export default (props: Props) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Sorry..</Text> */}
      <Text style={styles.title}>
        {props.title ? props.title : 'No book available'}
      </Text>
      <Text style={styles.subtitle}>{props?.note || "It's empty here."}</Text>
      <View style={styles.lottie}>
        <Lottie
          source={props.lottie ? props.lottie : lotties.EMPTYBOX}
          loop={false}
          autoPlay
          style={{ width: '100%' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: modules.BODY_HORIZONTAL,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: modules.BODY_HORIZONTAL_24,
  },
  title: {
    fontSize: modules.FONT_H5,
    ...fontGeorgiaBold,
    textAlign: 'center',
    color: modules.SUB_TITLE,
  },
  subtitle: {
    fontSize: modules.FONT_P,
    textAlign: 'center',
    paddingTop: modules.BODY_HORIZONTAL_12 / 2,
    color: modules.SUB_TITLE,
  },
  lottie: {
    width: modules.VIEW_PORT_WIDTH / 2,
    // marginTop: modules.VIEW_PORT_HEIGHT / 4
  }
});
