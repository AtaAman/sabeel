import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { useQuran } from "@/store/useQuranContext";
import useSurahs from "../../hooks/useSurah";
import { LinearGradient } from "expo-linear-gradient";
const fonts = ["Uthmanic", "indopak"];

const Settings: React.FC = () => {
  const {
    selectedSurah,
    setSelectedSurah,
    selectedAyat,
    setSelectedAyat,
    selectedQuari,
    setSelectedQuari,
    setArabicFont,
    showTranslationUrdu,
    setShowTranslationUrdu,
    showTranslationEnglish,
    setShowTranslationEnglish,
  } = useQuran();
  const { surahs } = useSurahs();
  const [quari, setQuari] = useState<
    {
      identifier: any;
      englishName: string;
    }[]
  >([]);
  useEffect(() => {
    const fetchQuari = async () => {
      try {
        const res = await fetch(
          "http://api.alquran.cloud/v1/edition?format=audio&language=ar"
        );
        const data = await res.json();
        setQuari(data.data);
      } catch (error) {
        console.error("Error fetching Quari:", error);
      }
    };
    fetchQuari();
  }, []);

  const quariHandler = (value: string) => {
    setSelectedQuari(parseInt(value));
  };

  function handleSurahChange(itemValue: any, itemIndex: number): void {
    const selectedSurah = surahs.find(
      (surah) => surah.number.toString() === itemValue
    );
    setSelectedSurah(selectedSurah);
  }

  return (
        <LinearGradient
          colors={["#1e88e5", "#e3f2fd"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        >
    <SafeAreaView className="flex h-screen-safe items-center justify-start">
      <View className="w-[90%]">
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Header
            surahs={surahs}
            selectedSurah={selectedSurah}
            setSelectedSurah={setSelectedSurah}
            selectedAyat={selectedAyat}
            setSelectedAyat={setSelectedAyat}
            fonts={fonts}
            setArabicFont={setArabicFont}
          />
          <Text className="text-primary pt-8 p-2 text-xl font-semibold">Select Reciter</Text>
          <Picker
            selectedValue={selectedQuari.toString()}
            onValueChange={quariHandler}
            style={styles.picker}
          >
            {quari?.map((item, i) => (
              <Picker.Item
                key={i}
                label={`${i + 1}. ${item.englishName}`}
                value={i.toString()}
              />
            ))}
          </Picker>

          <View className="mt-10" style={styles.translationToggleContainer}>
            <Text className="text-secondary-100 text-lg">Urdu Translation</Text>
            <Switch
              value={showTranslationUrdu}
              onValueChange={() => setShowTranslationUrdu(!showTranslationUrdu)}
            />
          </View>
          <View className="mt-4" style={styles.translationToggleContainer}>
            <Text className="text-secondary-100 text-lg">English Translation</Text>
            <Switch
              value={showTranslationEnglish}
              onValueChange={() =>
                setShowTranslationEnglish(!showTranslationEnglish)
              }
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;

const styles = StyleSheet.create({

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  picker: { 
    backgroundColor: "#000",
    opacity: 0.7,
    elevation: 5,
    shadowColor: "#000",
    borderRadius: 16, 
  },

  translationToggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});


