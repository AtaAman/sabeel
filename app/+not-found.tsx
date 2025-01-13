import { Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
  return (
    <SafeAreaView className='flex items-center justify-center'>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Text>your are in wrong route</Text>
    </SafeAreaView>
  );
}
