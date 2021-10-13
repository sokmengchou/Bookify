import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { RouteProvider } from "./RouteContext";
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Host } from 'react-native-portalize'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import AppTab from "./AppTab";
import GeoSelectorContainer from "screens/GeoSelector";
import EditInformationContainer from "screens/Auth/EditInfomation";
import FillUpInformationContainer from "screens/Auth/FillUpInfomation";
import ListBookContainer from "screens/ListBook";
import LoginContainer from "screens/Auth/Login";
import BookDetailContainer from "screens/BookDetail";
import ReadBookContainer from "screens/ReadBook";
import WelcomeContainer from "screens/Welcome/WelcomeContainer";
import FavoriteContainer from "screens/Favorite";
import HistoryContainer from "screens/History";
import ListAudioContainer from "screens/ListAudio";
import SectionListContainer from "screens/SectionList";
import CalmModeContainer from "screens/ReadBook/CalmMode"
const RootStack = createNativeStackNavigator()

function ROOT_STACK() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false, screenOrientation: 'portrait' }}>
      <RootStack.Screen options={{ stackAnimation: 'fade' }} name="WELCOME" component={WelcomeContainer} />
      <RootStack.Screen options={{ stackAnimation: 'fade' }} name="HOME_STACK" component={AppTab} />
      <RootStack.Screen options={{ stackAnimation:'slide_from_bottom'  }} name="READ_BOOK" component={ReadBookContainer} />
      <RootStack.Screen options={{ gestureEnabled: false, stackAnimation: "flip" }} name="LIST_AUDIO" component={ListAudioContainer} />
      <RootStack.Screen options={{ gestureEnabled: false, stackAnimation: "flip" }} name="SECTION" component={SectionListContainer} />
      <RootStack.Screen options={{ gestureEnabled: false, stackAnimation: "flip" }} name="CALM_MODE" component={CalmModeContainer} />
      <RootStack.Screen name="FILL_UP_INFO" component={FillUpInformationContainer} />
      <RootStack.Screen name="EDIT_INFO" component={EditInformationContainer} />
      <RootStack.Screen name="GEO_SELECTOR" component={GeoSelectorContainer} />
      <RootStack.Screen name="LIST_BOOK" component={ListBookContainer} />
      <RootStack.Screen name="LOGIN" component={LoginContainer} />
      <RootStack.Screen name="BOOK_DETAIL" component={BookDetailContainer} />
      <RootStack.Screen name="FAVORITE" component={FavoriteContainer} />
      <RootStack.Screen name="HISTORY" component={HistoryContainer} />




    </RootStack.Navigator>
  )
}

enableScreens()

export default function App() {
  return (
    // <NavigationContainer>
    //   <APP_STACK />
    // </NavigationContainer>
    <RouteProvider value={true}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Host>
            <ROOT_STACK />
          </Host>
        </NavigationContainer>
      </SafeAreaProvider>
    </RouteProvider>
  );
}
