import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, PanResponder, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {},
});

interface ScratchcardProps {
  width: number;
  height: number;
  backgroundImageSource: any;
  children?: JSX.Element;
  resolution?: number;
}

class Scratchable {
  x: number = 0;
  y: number = 0;
  width: number = 1;
  height: number = 1;
  isScratched: boolean = false;

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          left: this.x,
          top: this.y,
          width: this.width,
          height: this.height,
          backgroundColor: this.isScratched ? 'transparent' : 'gray',
        }}
      />
    );
  }

  scratch() {
    this.isScratched = true;
  }
}

export default function ScratchcardMinigame(props: ScratchcardProps) {
  const [scratchables, setScratchables] = useState<Scratchable[]>([]);

  useEffect(() => {
    const newScratchables = [];
    const resolution = props.resolution || 5;
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const scratchable = new Scratchable();
        scratchable.x = (props.width / resolution) * i;
        scratchable.y = (props.height / resolution) * j;
        scratchable.width = 5;
        scratchable.height = 5;
        newScratchables.push(scratchable);
      }
    }
    setScratchables(newScratchables);
  }, [props.width, props.height, props.resolution]);

  const handleScratch = (x: number, y: number) => {
    setScratchables((prevScratchables) =>
      prevScratchables.map((scratchable) => {
        if (
          scratchable.x <= x &&
          x < scratchable.x + scratchable.width &&
          scratchable.y <= y &&
          y < scratchable.y + scratchable.height
        ) {
          scratchable.isScratched = true;
        }
        return scratchable;
      })
    );
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const x = gestureState.moveX;
        const y = gestureState.moveY;
        handleScratch(x, y);
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <ImageBackground
        source={props.backgroundImageSource}
        style={{
          width: props.width,
          height: props.height,
        }}
      >
        {scratchables.map((scratchable, index) =>
          scratchable.isScratched ? null : (
            <View key={index} style={{ position: 'absolute' }}>
              {scratchable.render()}
            </View>
          )
        )}
        {props.children}
      </ImageBackground>
    </View>
  );
}
