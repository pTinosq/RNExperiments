import Slider from '@react-native-community/slider'
import { useState } from 'react'
import React, { StyleSheet, View } from 'react-native'
import AnimatedReactiveGraph from '../AnimatedReactiveGraph'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  sliderContainer: {
    aspectRatio: 1,
    justifyContent: 'center',
    width: 164,
    backgroundColor: '#434343',
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    transform: [{ rotate: '-90deg' }],
  },
})

export default function CombinationLockContainer() {
  const [value, setValue] = useState(0)
  const trueValue = 50

  const calculateMagnitude = (currentValue: number, targetValue: number) => {
    const sigma = 15 // Higher sigma means a wider curve
    const exponent =
      -Math.pow(currentValue - targetValue, 2) / (2 * Math.pow(sigma, 2))
    const magnitude = Math.exp(exponent)
    return magnitude
  }

  const magnitude = calculateMagnitude(value, trueValue)

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Slider
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor="#FFFFFF"
          style={styles.slider}
          value={value}
          onValueChange={setValue}
        />
      </View>

      <AnimatedReactiveGraph magnitude={magnitude} />
    </View>
  )
}
