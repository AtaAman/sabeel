import React, { useState } from "react";
import { Text, TouchableOpacity, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import useSurahs from "../../hooks/useSurah";
import { useSurah } from "@/store/useSurahContext";

const HomePage = () => {
  const { surahs } = useSurahs();
    const {
      setSelectedSurah,
      setSelectedAyat,
    } = useSurah();
  const router = useRouter();

  console.log(surahs);
  

  const renderSurahCard = ({ item }: any) => (
    <TouchableOpacity
      className="bg-[#fff]/10 flex justify-center backdrop-blur-lg rounded-2xl h-[200px] p-4 m-2 w-[220px] items-center"
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
      <Text className="text-sm text-secondary">Total Ayahs: {item.numberOfAyahs}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#000814", "#0077b6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <SafeAreaView className="flex h-screen-safe items-center justify-start">
        <Text className="text-2xl w-full font-bold text-secondary px-5">
          Surahs
        </Text>

        <FlatList
          data={surahs}
          renderItem={renderSurahCard}
          keyExtractor={(item) => item.number.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomePage;
