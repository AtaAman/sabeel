import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  KeyboardAvoidingView,
} from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { LinearGradient } from "expo-linear-gradient";

const login = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    setSubmitting(true);
    router.push("/home");
  };

  return (
    <LinearGradient
      colors={["#000814", "#0077b6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView>
        <ScrollView>
          <View className="w-full flex items-center justify-center h-screen-safe px-4 my-6">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[115px] h-[84px]"
            />

            <Text className="text-2xl font-semibold text-secondary mt-10 font-psemibold">
              Log in to Sabeel
            </Text>

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e: any) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
              placeholder="email"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e: any) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
              placeholder="password"
            />

            <CustomButton
              title="Sign In"
              handlePress={submit}
              containerStyles="w-full mt-7"
              isLoading={isSubmitting}
              textStyles={undefined}
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Don't have an account?
              </Text>
              <Link
                href="/register"
                className="text-lg font-psemibold text-secondary"
              >
                Signup
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default login;
