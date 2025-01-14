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

const HomePage = () => {
  const { surahs } = useSurahs();
  const { setSelectedSurah, setSelectedAyat, arabicFont, } = useSurah();
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

  const renderSurahCard = ({ item }: any) => (
    <TouchableOpacity
      className="bg-[#fff]/10 flex border border-primary  justify-center backdrop-blur-lg rounded-2xl mr-6 w-[250px] items-center"
      onPress={() => {
        setSelectedSurah(item);
        setSelectedAyat(1);
        router.push({
          pathname: "/Quran/surah",
          params: { surahNumber: item.number },
        });
      }}
    >
      {/* <Text className="text-xl text-white font-bold mb-1">{item.number}</Text> */}
      <View className="flex flex-row justify-between w-full px-4">
      <Text style={[{ fontFamily: fonts[arabicFont] }]} className="text-2xl text-secondary font-extrabold">{item.name}</Text>
      <Text className="text-lg text-secondary">{item.englishName}</Text>
      </View>
      <Image
            source={images.surah}
            className="h-[90px] w-[90px]"
            resizeMode="contain"
       />
      <Text className="text-sm text-orange-100 mb-1">
        {item.englishNameTranslation}
      </Text>
     
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#000814", "#0077b6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex h-full items-center justify-start">
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
          style={{ flex: 1, width: '100%' }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Text className="text-xl w-full my-2 text-secondary px-5">
            Chapter
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
            <Text className="text-xl w-full mt-4 mb-2 text-secondary px-5">
              Quran Reading
            </Text>
            <TouchableOpacity
              className="bg-[#fff]/10 flex justify-center backdrop-blur-lg rounded-2xl h-[200px] w-[95%] items-center"
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
               <Text className="text-orange-100 text-lg">Continue Reading </Text>
                <Icon name="arrow-right" size={12} color="#ffede5" />
              </View>
            </TouchableOpacity>

            <Text className="text-xl w-full mt-4 mb-2 text-secondary px-5">
              Surah of the day 
            </Text>

            <TouchableOpacity
              className="bg-[#fff]/10 flex justify-center backdrop-blur-lg rounded-2xl h-[200px] w-[95%] items-center"
              onPress={() => {
                router.push({
                  pathname: "/Quran/quran",
                });
              }}
            >
              <Text className="text-secondary">Quran</Text>
              <Text className="px-4 py-2 rounded-2xl mt-4  bg-secondary text-primary">
                Continue Reading
              </Text>
            </TouchableOpacity>

            <Text className="text-xl w-full mt-4 mb-2 text-secondary px-5">
              Daily Reading
            </Text>

            <TouchableOpacity
              className="bg-[#fff]/10 flex justify-center backdrop-blur-lg rounded-2xl h-[200px] w-[95%] items-center"
              onPress={() => {
                router.push({
                  pathname: "/Quran/quran",
                });
              }}
            >
              <Text className="text-secondary">Quran</Text>
              <Text className="px-4 py-2 rounded-2xl mt-2 bg-secondary text-primary">
                Continue Reading
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomePage;
