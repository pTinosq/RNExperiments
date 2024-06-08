import { Canvas, Circle, Shadow } from '@shopify/react-native-skia'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default function CombinationLockBase() {
  const circleRadius = 64
  const circleDiameter = circleRadius * 2
  const centerX = width / 2
  const centerY = height / 2

  return (
    <Canvas style={{ flex: 1 }}>
      <Circle cx={centerX} cy={centerY} r={circleRadius} color="#e0e5ec">
        <Shadow dx={-10} dy={-10} blur={20} color="#ffffff" inner />
        <Shadow dx={10} dy={10} blur={20} color="#a3b1c6" inner />
        <Shadow dx={-10} dy={-10} blur={20} color="#ffffff" />
        <Shadow dx={10} dy={10} blur={20} color="#a3b1c6" />
      </Circle>
    </Canvas>
  )
}
