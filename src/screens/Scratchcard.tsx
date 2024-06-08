import { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { ScratchCard } from 'rn-scratch-card'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  background_view: {
    position: 'absolute',
    width: 400,
    height: 400,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 16,
  },
  scratchCard: {
    width: 400,
    height: 400,
    backgroundColor: 'transparent',
  },
  scratchCardContainer: {
    width: 400,
    height: 400,
    borderRadius: 16,
    overflow: 'hidden',
  },
  successText: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textContainer: {
    padding: 16,
  },
})

export default function Scratchcard() {
  const { width, height } = Dimensions.get('window')
  const scale = useSharedValue(1)
  const translateX = useSharedValue(0)
  const opacity = useSharedValue(0) // initialize opacity value
  const [isScratched, setIsScratched] = useState(false)

  const handleScratch = (scratchPercentage: number) => {
    console.log(scratchPercentage)
    if (scratchPercentage > 68) {
      setIsScratched(true)
    }
  }

  useEffect(() => {
    if (isScratched) {
      scale.value = withSpring(1.2)
      opacity.value = withTiming(1, { duration: 500 }) // animate opacity to 1
    }
  }, [isScratched])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateX: translateX.value }],
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.scratchCardContainer}>
        <Image
          source={require('../assets/20perc-off.webp')}
          style={styles.background_view}
        />
        <ScratchCard
          source={require('../assets/scratch_foreground.png')}
          brushWidth={65}
          onScratch={handleScratch}
          style={styles.scratchCard}
        />
      </View>

      <Animated.View style={[styles.textContainer, animatedTextStyle]}>
        <Text style={styles.successText}>Congratulations!</Text>
        <Text style={styles.successText}>
          A 20% off discount has been applied!
        </Text>
      </Animated.View>
    </Animated.View>
  )
}
