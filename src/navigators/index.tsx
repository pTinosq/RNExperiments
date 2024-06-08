import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HiddenKey from '../screens/HiddenKey'
import Home from '../screens/Home'
import Scratchcard from '../screens/Scratchcard'

const Stack = createStackNavigator()

/**
 * Navigator for the app, servicing movement between screens
 */
const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardOverlayEnabled: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HiddenKey" component={HiddenKey} />
      <Stack.Screen name="Scratchcard" component={Scratchcard} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default RootNavigator
