/**
 * @format
 */
 import 'react-native-gesture-handler';
 import {setCustomText} from 'react-native-global-props';
 import {enableScreens} from 'react-native-screens';
 import {AppRegistry} from 'react-native';
 import {fontNormal} from './customs/customFont';
 import modules from './app/modules';
 import App from './App';
 import {name as appName} from './app.json';
 
 enableScreens();
 
 const customTextProps = {
   style: {
     fontSize: modules.FONT,
     ...fontNormal,
   },
 };
 setCustomText(customTextProps);
 
 AppRegistry.registerComponent(appName, () => App);
 