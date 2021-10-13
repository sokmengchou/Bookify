/* eslint-disable no-shadow */
import * as React from "react";
import { useNavigation } from '@react-navigation/native';

export enum IStatus { focus = "focus", blur = "blur" }

export default function useScreenFocus(): [IStatus] {
  const navigation = useNavigation();
  const [Status, setStatus] = React.useState<IStatus>(IStatus.focus)

  React.useEffect(() => {
    const focusRef = navigation.addListener('focus', () => {
      setStatus(IStatus.focus)
    })
    const blurRef = navigation.addListener('blur', () => {
      setStatus(IStatus.blur)
    })
    return () => { focusRef(); blurRef() }
  }, [navigation]);

  return [Status]
}
