import React, { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    // Fullscreen modal
    width: '100%',
    height: '100%',
    backgroundColor: '#00000090',
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
})

interface SuccessModalProps {
  onRestart: () => void
}

export default function SuccessModal(props: SuccessModalProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Congratulations!</Text>
      <Text style={styles.sectionTitle}>You found the hidden bear!</Text>
      <TouchableOpacity onPress={props.onRestart}>
        <Text style={styles.sectionTitle}>restart</Text>
      </TouchableOpacity>
    </View>
  )
}
