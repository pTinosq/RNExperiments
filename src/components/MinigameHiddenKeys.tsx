import MaskedView from '@react-native-masked-view/masked-view'
import { useEffect, useRef, useState } from 'react'
import React, { Dimensions, Image, StyleSheet, View } from 'react-native'
import AnimatedReactiveGraph from './AnimatedReactiveGraph'
import SuccessModal from './SuccessModal'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  graphContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  keyImage: {
    position: 'absolute',
    width: 32,
    height: 32,
  },
})

const CIRCLE_RADIUS = 64
const KEY_BUFFER = 128

export default function MinigameHiddenKeys() {
  const { width, height } = Dimensions.get('window')
  const flashlightLocation = useRef([width / 2, height / 2])
  const [, setRender] = useState(0)

  const [keyLocation, setKeyLocation] = useState([width / 2, height / 2])
  const [distanceToKey, setDistanceToKey] = useState(0)
  const [foundKey, setFoundKey] = useState(false)

  useEffect(() => {
    setKeyLocation([
      Math.random() * (width - 2 * KEY_BUFFER) + KEY_BUFFER,
      Math.random() * (height - 2 * KEY_BUFFER) + KEY_BUFFER,
    ])
    setFoundKey(false)
  }, [])

  const handleMove = (e: any) => {
    if (foundKey) return
    flashlightLocation.current = [
      e.nativeEvent.locationX,
      e.nativeEvent.locationY,
    ]
    setRender((prev) => prev + 1) // Force re-render
  }

  // Calculate the distance between the flashlight and the key and translate to magnitude (0-1)
  useEffect(() => {
    const calculateDistance = () => {
      const distanceY = flashlightLocation.current[1] - keyLocation[1]
      const distanceX = flashlightLocation.current[0] - keyLocation[0]

      // Use the greatest distance to calculate the magnitude
      const distance = Math.max(Math.abs(distanceX), Math.abs(distanceY))
      const maxDistance = Math.max(width, height)

      setDistanceToKey(distance / maxDistance)
    }

    const intervalId = setInterval(calculateDistance, 20)

    return () => clearInterval(intervalId)
  }, [keyLocation, width, height])

  const calculateMagnitude = (currentValue: number, targetValue: number) => {
    const sigma = 0.1 // Much smaller sigma for a more sensitive curve
    const exponent =
      -Math.pow(currentValue - targetValue, 2) / (2 * Math.pow(sigma, 2))
    const magnitude = Math.exp(exponent)
    return magnitude
  }

  const interpolateColor = (distance: number) => {
    const startColor = { r: 224, g: 229, b: 236 }
    const endColor = { r: 0, g: 255, b: 0 }

    const ratio = Math.min(distance / 0.05, 1)

    const r = Math.round(
      startColor.r + (endColor.r - startColor.r) * (1 - ratio),
    )
    const g = Math.round(
      startColor.g + (endColor.g - startColor.g) * (1 - ratio),
    )
    const b = Math.round(
      startColor.b + (endColor.b - startColor.b) * (1 - ratio),
    )

    return `rgb(${r}, ${g}, ${b})`
  }

  // if distance is less than 0.05, show success modal
  if (distanceToKey < 0.02) {
    if (!foundKey) {
      setFoundKey(true)
    }
  }

  const handleRestart = () => {
    setFoundKey(false)
    setKeyLocation([
      Math.random() * (width - 2 * KEY_BUFFER) + KEY_BUFFER,
      Math.random() * (height - 2 * KEY_BUFFER) + KEY_BUFFER,
    ])
  }

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => true}
      onResponderMove={handleMove}
    >
      {foundKey && <SuccessModal onRestart={handleRestart} />}
      <View
        style={[
          styles.graphContainer,
          {
            top: flashlightLocation.current[1] + CIRCLE_RADIUS,
            left: flashlightLocation.current[0] - CIRCLE_RADIUS,
          },
        ]}
      >
        <AnimatedReactiveGraph
          // closer to the key, the greater the magnitude
          magnitude={calculateMagnitude(distanceToKey, 0)}
          width={CIRCLE_RADIUS * 2}
          height={CIRCLE_RADIUS}
          color={interpolateColor(distanceToKey)}
        />
      </View>

      <MaskedView
        maskElement={
          <View
            style={{
              width: CIRCLE_RADIUS * 2,
              height: CIRCLE_RADIUS * 2,
              backgroundColor: 'black',
              borderRadius: CIRCLE_RADIUS * 2,
              position: 'absolute',
              top: flashlightLocation.current[1] - CIRCLE_RADIUS,
              left: flashlightLocation.current[0] - CIRCLE_RADIUS,
            }}
          />
        }
        style={{
          flexDirection: 'row',
          height: '100%',
          width: '100%',
        }}
      >
        <View style={{ width: '100%', height: '100%' }}>
          <Image
            source={require('../assets/attic2.webp')}
            style={{ width: '100%', height: '100%' }}
          />
          <Image
            source={require('../assets/pixelbear.png')}
            style={[
              styles.keyImage,
              {
                top: keyLocation[1] - 16, // Adjust for center of key image
                left: keyLocation[0] - 16, // Adjust for center of key image
              },
            ]}
          />
        </View>
      </MaskedView>
    </View>
  )
}
