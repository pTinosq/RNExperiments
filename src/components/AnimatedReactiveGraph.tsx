import { Canvas, Path, Skia } from '@shopify/react-native-skia'
import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'

interface AnimatedReactiveGraphProps {
  magnitude: number
  width: number
  height: number
  color?: string
}

export default function AnimatedReactiveGraph(
  props: AnimatedReactiveGraphProps,
) {
  const [path, setPath] = useState(Skia.Path.Make())
  const frameId = useRef<number | null>(null)

  const buildPathMap = (magnitude: number, resolution: number) => {
    const newPath = Skia.Path.Make()
    newPath.moveTo(0, props.height / 2)
    for (let i = 1; i < resolution + 1; i++) {
      const x = props.width * (i / resolution)

      // Adjust the magnitude so that each end of the path is at a lower value than the true magnitude in the center
      const adjustedMagnitude =
        magnitude * 1 * Math.sin((Math.PI * i) / resolution)

      const y =
        props.height / 2 +
        (Math.random() - 0.5) * adjustedMagnitude * props.height

      newPath.lineTo(x, y)
    }
    return newPath
  }

  useEffect(() => {
    const updatePath = () => {
      const newPath = buildPathMap(props.magnitude, 50)
      setPath(newPath)
      frameId.current = requestAnimationFrame(updatePath)
    }

    frameId.current = requestAnimationFrame(updatePath)

    // Cleanup on component unmount
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current)
      }
    }
  }, [props.magnitude])

  return (
    <View>
      <Canvas
        style={{
          width: props.width,
          height: props.height,
          backgroundColor: 'transparent',
        }}
      >
        <Path
          path={path}
          color={props.color || '#E0E5EC'}
          style="stroke"
          strokeJoin="round"
          strokeWidth={1}
        />
      </Canvas>
    </View>
  )
}
