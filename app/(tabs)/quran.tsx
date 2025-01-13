import React, { useState } from "react";
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

const HomePage = () => {
  const { surahs } = useSurahs();
  const { setSelectedSurah, setSelectedAyat } = useSurah();
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const filteredSurahs = surahs.filter(
    (surah: any) =>
      surah.englishNameTranslation
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      surah.englishName.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderSurahCard = ({ item }: any) => (
    <TouchableOpacity
      className="bg-[#fff]/10 flex  justify-center backdrop-blur-lg rounded-2xl p-2 mr-6 w-[220px] items-center"
      onPress={() => {
        setSelectedSurah(item);
        setSelectedAyat(1);
        router.push({
          pathname: "/Quran/surah",
          params: { surahNumber: item.number },
        });
      }}
    >
      <Text className="text-xl text-white font-bold mb-1">{item.number}</Text>
      <Text className="text-xl text-white font-bold mb-1">{item.name}</Text>
      <Text className="text-2xl text-blue-300">{item.englishName}</Text>
      <Text className="text-sm text-gray-300 mb-1">
        {item.englishNameTranslation}
      </Text>
      <Text className="text-sm text-secondary">
        Total Ayahs: {item.numberOfAyahs}
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
            <Icon name="gear" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="w-[95%] flex-row items-center bg-[#fff]/20 p-3 rounded-2xl mb-2">
          <Icon
            name="search"
            size={20}
            color="#fff"
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
            Surahs
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
              height: 220,
            }}
          />

          <View className="w-full flex items-center">
            <Text className="text-xl w-full mt-4 text-secondary px-5">
              Surah of the Day
            </Text>
            <TouchableOpacity
              className="bg-[#fff]/10 flex justify-center backdrop-blur-lg rounded-2xl h-[200px] w-[95%] mt-4 items-center"
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

            <Text className="text-xl w-full mt-4 text-secondary px-5">
              Favourite 
            </Text>

            <TouchableOpacity
              className="bg-[#fff]/10 flex justify-center backdrop-blur-lg rounded-2xl h-[200px] w-[95%] mt-4 items-center"
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

            <Text className="text-xl w-full mt-4 text-secondary px-5">
              night recitations
            </Text>

            <TouchableOpacity
              className="bg-[#fff]/10 flex justify-center backdrop-blur-lg rounded-2xl h-[200px] w-[95%] mt-4 items-center"
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
