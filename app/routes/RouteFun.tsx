import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack'

export interface NavigationV5Props {
  navigation: NativeStackNavigationProp<any, any>
  route: RouteProp<any, any>
}

export interface NavigationDrawerV5Props {
  navigation: DrawerNavigationProp<any, any>;
  route: RouteProp<any, any>;
}

export type TNavigation = NativeStackNavigationProp<any, any>

export function switchRoute(routeName: string) {
  return {
    index: 0,
    routes: [{ name: routeName }],
  }
}
