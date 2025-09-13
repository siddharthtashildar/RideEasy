import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import React from "react";
import { View } from "react-native";   // ✅ use View instead
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import RideOptionsScreen from "./screens/RideOptionsScreen";
import ConfirmScreen from "./screens/ConfirmScreen";
import DriverProfileScreen from "./screens/DriverProfileScreen";
import { ThemeProvider } from "./context/ThemeContext";
import SideMenu from "./screens/SideMenu";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RideOptions" component={RideOptionsScreen} />
      <Stack.Screen name="Confirm" component={ConfirmScreen} />
      <Stack.Screen name="DriverProfile" component={DriverProfileScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <SideMenu {...props} />}
            screenOptions={{ headerShown: false }}
          >
            <Drawer.Screen name="MainStack" component={MainStack} />
          </Drawer.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>

  );
}
