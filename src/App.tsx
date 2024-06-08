import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Navigators from './navigators'

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#e0e5ec',
          height: '100%',
          width: '100%',
        }}
      >
        <StatusBar />
        <Navigators />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default App
