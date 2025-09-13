import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RideOptionsScreen from '../screens/RideOptionsScreen';
import ConfirmScreen from '../screens/ConfirmScreen';
import DriverProfileScreen from '../screens/DriverProfileScreen';


const Stack = createNativeStackNavigator();


export default function StackNavigator() {
return (
<Stack.Navigator>
<Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Ride Easy' }} />
<Stack.Screen name="RideOptions" component={RideOptionsScreen} options={{ title: 'Choose Ride' }} />
<Stack.Screen name="Confirm" component={ConfirmScreen} options={{ title: 'Confirm' }} />
<Stack.Screen name="DriverProfile" component={DriverProfileScreen} options={{ title: 'Driver' }} />
</Stack.Navigator>
);
}