import React, { StyleSheet, Text, View } from 'react-native'
import MinigameHiddenKeys from '../components/MinigameHiddenKeys'

export default function HiddenKey() {
  return (
    <View>
      <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>Use your torch to find</Text>
      <Text style={styles.sectionTitle}>some hidden treats</Text>
      </View>
      <MinigameHiddenKeys />
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
    color: '#F1ECD0',
  },
  sectionTitleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    width: '100%',
    zIndex: 3,
    paddingTop: 16,
  },
})
