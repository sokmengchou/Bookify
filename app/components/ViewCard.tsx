import * as React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import modules from '../modules';
interface Props extends ViewProps {
  children: any
  colors?: any[]
}

export default (props: Props) => {
  if(props.colors&&props.colors.length > 0){
    return(
      <LinearGradient style={styles.container} {...props} colors={props.colors} end={{ x: 0, y: 1 }} start={{ x: 0, y: 0 }}>
      {props.children}
    </LinearGradient>
    )
  }else {
    return (
      <LinearGradient style={styles.container} {...props} colors={[modules.WHITE, modules.BACKGROUND_PRIMARY]} end={{ x: 0, y: 1 }} start={{ x: 0, y: 0 }}>
        {props.children}
      </LinearGradient>
    );
  }
 
};
const styles = StyleSheet.create({
  container: {}
});
