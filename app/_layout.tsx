import { useEffect } from "react";
import { useFonts } from "expo-font";
import "react-native-url-polyfill/auto";
import { SplashScreen, Stack } from "expo-router";
import "../global.css";
import { QuranProvider } from "@/store/useQuranContext";
import { SurahProvider } from "@/store/useSurahContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <QuranProvider>
      <SurahProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="Quran/quranSettings"
            options={{
              headerTitle: "Settings",
              headerStyle: { backgroundColor: "#1e88e5" },
              headerTintColor: "#ffffff",
              headerBackTitle: "back",
            }}
          />
          <Stack.Screen
            name="Quran/surahSettings"
            options={{
              headerTitle: "Settings",
              headerStyle: { backgroundColor: "#1e88e5" },
              headerTintColor: "#ffffff",
              headerBackTitle: "back",
            }}
          />
          <Stack.Screen
            name="Quran/surah"
            options={{
              headerTitle: "Surah",
              headerStyle: { backgroundColor: "#1e88e5" },
              headerTintColor: "#ffffff",
              headerBackTitle: "back",
            }}
          />
          <Stack.Screen
            name="Quran/quran"
            options={{
              headerTitle: "Quran",
              headerStyle: { backgroundColor: "#1e88e5" },
              headerTintColor: "#ffffff",
              headerBackTitle: "back",
            }}
          />
        </Stack>
      </SurahProvider>
    </QuranProvider>
  );
};

export default RootLayout;
