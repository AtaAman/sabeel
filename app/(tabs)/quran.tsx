import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import useSurahs from "../../hooks/useSurah";
import { useSurah } from "@/store/useSurahContext";
import { images } from "../../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Font from "expo-font";
import * as Notifications from "expo-notifications";

const HomePage = () => {
  const { surahs } = useSurahs();
  const { setSelectedSurah, setSelectedAyat, arabicFont } = useSurah();
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const fonts = ["Uthmanic", "indopak"];
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        indopak: require("../../assets/fonts/indopak.ttf"),
        Uthmanic: require("../../assets/fonts/Uthmanic.ttf"),
        JameelNoori: require("../../assets/fonts/JameelNoori.ttf"),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  const filteredSurahs = surahs.filter(
    (surah: any) =>
      surah.englishNameTranslation
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      surah.englishName.toLowerCase().includes(searchText.toLowerCase())
  );

  const scheduleNotification = async () => {
    const currentHour = new Date().getHours();

    if (currentHour === 20) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder",
          body: "It's time to recite Surah Al-Mulk before bed.",
        },
        trigger: {
          hour: 20,
          minute: 0,
          repeats: true,
        },
      });
    }
  };

  scheduleNotification();

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const surahOfTheDay =
    today === "Monday"
      ? surahs.find((surah) => surah.englishName === "Al-Faatiha")
      : today === "Tuesday"
      ? surahs.find((surah) => surah.englishName === "Ar-Rahmaan")
      : today === "Wednesday"
      ? surahs.find((surah) => surah.englishName === "Yunus")
      : today === "Thursday"
      ? surahs.find((surah) => surah.englishName === "Yaseen")
      : today === "Friday"
      ? surahs.find((surah) => surah.englishName === "Al-Kahf")
      : today === "Saturday"
      ? surahs.find((surah) => surah.englishName === "Maryam")
      : today === "Sunday"
      ? surahs.find((surah) => surah.englishName === "Al-Muhammad")
      : null;

  const surahOfTheNights = surahs.find(
    (surah) => surah.englishName === "Al-Mulk"
  );

  const handleSurahPress = (surah: any) => {
    if (surah) {
      setSelectedSurah(surah);
      setSelectedAyat(1);
      router.push({
        pathname: "/Quran/surah",
        params: { surahNumber: surah.number },
      });
    }
  };

  const renderSurahCard = ({ item }: any) => (
    <TouchableOpacity
      className="bg-[#fff]/10 flex border border-secondary/20  justify-center backdrop-blur-lg rounded-2xl mr-6 w-[240px] items-center"
      onPress={() => {
        setSelectedSurah(item);
        setSelectedAyat(1);
        router.push({
          pathname: "/Quran/surah",
          params: { surahNumber: item.number },
        });
      }}
    >
      <Image
        source={images.surah}
        className="h-full w-full rounded-2xl"
        resizeMode="contain"
      />
      <View className="flex absolute justify-center h-full items-center w-full px-4">
        <Text
          style={[{ fontFamily: fonts[arabicFont] }]}
          className="text-3xl pt-4 text-secondary font-extrabold"
        >
          {item.name}
        </Text>
        <Text className="text-md text-secondary/80">{item.englishName}</Text>
        
      </View>
      
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#000814", "#0077b6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex h-screen-safe-offset-10 items-center justify-start">
        <View className=" w-full flex flex-row items-center justify-between pb-2 px-4">
          <Image
            source={images.logo}
            className="h-[45px] w-[80px]"
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/Quran/surahSettings",
              })
            }
          >
            <Icon name="gear" size={30} color="#dad7cd" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="w-[95%] flex-row items-center bg-[#fff]/20 p-3 my-2 rounded-2xl">
          <Icon
            name="search"
            size={20}
            color="#dad7cd"
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder="Search Surah..."
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={setSearchText}
            className="text-white flex-1"
          />
        </View>

        <ScrollView
          style={{ flex: 1, width: "100%" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View className="flex items-center justify-center">
            {new Date().getHours() >= 20 && new Date().getHours() < 24 ? (
              <>
                <Text className="text-lg w-full mt-4 mb-2 text-secondary px-5">
                  Surah of the night
                </Text>
                <TouchableOpacity
                  className="bg-[#fff]/10 border border-secondary/20 flex justify-center backdrop-blur-lg rounded-2xl h-[200px] w-[95%] items-center"
                  onPress={() => handleSurahPress(surahOfTheNights)}
                >
                  <Image
                source={images.surah2}
                className="w-full h-full"
                resizeMode="cover"
              />
                  <View className="absolute">
                  <Text
                    style={[{ fontFamily: fonts[arabicFont] }]}
                    className="text-5xl pt-5 text-secondary font-extrabold"
                  >
                    {surahOfTheNights.name}
                  </Text>
                  <Text className="text-xl text-center text-secondary/90">
                    {surahOfTheNights.englishName}
                  </Text>
                </View>
                </TouchableOpacity>
              </>
            ) : null}
          </View>

          <Text className="text-lg w-full my-2 text-secondary px-5">
            Chapters
          </Text>

          {/* FlatList with natural height */}
          <FlatList
            data={filteredSurahs}
            renderItem={renderSurahCard}
            keyExtractor={(item) => item.number.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 10,
            }}
            style={{
              height: 180,
            }}
          />

          <View className="w-full flex items-center">
            <Text className="text-lg w-full mt-4 mb-2 text-secondary px-5">
              Quran Reading
            </Text>
            <TouchableOpacity
              className="bg-[#fff]/10 flex border border-secondary/20 justify-center backdrop-blur-lg rounded-2xl h-[200px] w-[95%] items-center"
              onPress={() => {
                router.push({
                  pathname: "/Quran/quran",
                });
              }}
            >
              <Image
                source={images.quran}
                className="w-full h-full"
                resizeMode="contain"
              />
              <View className="absolute flex flex-row items-center right-6 bottom-5">
                <Text className="text-secondary text-lg">
                  Continue Reading{" "}
                </Text>
                <Icon name="arrow-right" size={12} color="#dad7cd" />
              </View>
            </TouchableOpacity>
          </View>
          <View className="w-full flex items-center mt-4">
            <Text className="text-lg w-full mb-2 text-secondary px-5">
              Surah of the Day
            </Text>
            {surahOfTheDay ? (
              <TouchableOpacity
                className="bg-[#fff]/10 flex border border-secondary/20 justify-center backdrop-blur-lg rounded-2xl h-[200px] w-[95%] items-center"
                onPress={() => handleSurahPress(surahOfTheDay)}
              >
                <Image
                  source={images.surah2}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute">
                  <Text
                    style={[{ fontFamily: fonts[arabicFont] }]}
                    className="text-5xl pt-5 text-secondary font-extrabold"
                  >
                    {surahOfTheDay.name}
                  </Text>
                  <Text className="text-xl text-center text-secondary/90">
                    {surahOfTheDay.englishName}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <Text className="text-secondary">
                No Surah Selected for Today
              </Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomePage;
