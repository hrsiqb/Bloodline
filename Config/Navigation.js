
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Login';
import Dashboard from '../Screens/Dashboard';
import Menu from '../Screens/Menu';
import UserDetails from '../Screens/UserDetails';
import ms from '../styles'

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{
          headerStyle: [ms.bc_red], headerTitleStyle: [ms.as_c, ms.ff_s,
          ms.fw_b, ms.fs_25], headerLeft: null, headerTintColor: "#fff", title: "Donors"
        }} />
        <Stack.Screen name="Menu" component={Menu} options={{
          headerStyle: [ms.bc_red], headerTitleStyle: [ms.as_c, ms.ff_s,
          ms.fw_b, ms.fs_25], headerLeft: null, headerTintColor: "#fff", title: "Menu"
        }} />
        <Stack.Screen name="User Details" component={UserDetails} options={({ route }) => ({
          headerStyle: [ms.bc_red], headerTitleStyle: [ms.as_c, ms.ff_s,
          ms.fw_b, ms.fs_25], headerLeft: null, headerTintColor: "#fff", title: route.params.userInfo.FullName
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation