import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import React from 'react'
import APP_TAB from './AppTab';

const Stack = createNativeStackNavigator()
export default function APP_STACK() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen options={{ gestureEnabled: false, stackAnimation: "fade" }} name="APP" component={APP_TAB} />
        </Stack.Navigator>
    )
}