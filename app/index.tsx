import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";

const Welcome = () => {
  return (
    <SafeAreaView className="bg-primary-100">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="h-[100px] w-[150px]"
            resizeMode="contain"
          />

          <View
            style={{
              padding: 20,
              shadowColor: "020202",
              shadowOffset: { width: 2, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 6,
              elevation: 2,
            }}
            className="my-5 relative shadow-lg shadow-black-100 rounded-2xl bg-secondary"
          >
            <Text className="text-3xl rounded-2xl  text-secondary-200 font-bold text-justify px-4">
              Every Task, a Step Closer to Your Purpose.
            </Text>
            <Text className="text-md px-4 mt-5 font-pregular text-primary text-justify">
              Customize your spiritual journey with tailored routines. Track
              progress and stay committed to prayer, purpose, and devotion.
            </Text>
          </View>

          {/* <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          /> */}

          <CustomButton
            title="Start with Sabeel"
            handlePress={() => router.push("/login")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
