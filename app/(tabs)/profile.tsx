import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const profile = () => {
  return (
    <LinearGradient
          colors={["#000814", "#0077b6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        >
    </LinearGradient>
  )
}

export default profile


