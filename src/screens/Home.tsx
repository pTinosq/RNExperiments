import { NavigationContext } from '@react-navigation/native'
import { useContext } from 'react'
import React, { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Home() {
  const navigation = useContext(NavigationContext)

  return (
    <View>
      <Text style={styles.sectionTitle}>Tinos' sandbox</Text>
      <TouchableOpacity onPress={() => navigation?.navigate('HiddenKey')}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            color: 'black',
            backgroundColor: 'lightblue',
          }}
        >
          Go to MinigameHiddenKeys
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation?.navigate('Scratchcard')}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            color: 'black',
            backgroundColor: 'lightblue',
          }}
        >
          Go to Scratchcard
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 36,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    marginTop: 32,
  },
})
