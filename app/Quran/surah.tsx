import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import useSurahs from "../../hooks/useSurah";
import { Audio } from "expo-av";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
const fonts = ["Uthmanic", "indopak"];
import { useSurah } from "@/store/useSurahContext";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../../constants";
const Quran = () => {
  const [allSurahs, setAllSurahs] = useState<any[]>([]);
  const { surahs } = useSurahs();
  const {
    selectedSurah,
    selectedAyat,
    selectedQuari,
    arabicFont,
    quari,
    showTranslationUrdu,
    showTranslationEnglish,
    setSelectedSurah,
    setSelectedAyat,
    setQuari,
  } = useSurah();
  const [ayatDetails, setAyatDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
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

    const createData = async () => {
      const res1 = await fetch("http://api.alquran.cloud/v1/quran/ar.alafasy");
      const data1 = await res1.json();
      const arData = data1.data.surahs;

      const res2 = await fetch("http://api.alquran.cloud/v1/quran/ur.maududi");
      const data2 = await res2.json();
      const bnData = data2.data.surahs;

      const res3 = await fetch("http://api.alquran.cloud/v1/quran/en.ahmedali");
      const data3 = await res3.json();
      const enData = data3.data.surahs;

      const newData = arData.map((surah: any, index: number) => ({
        ...surah,
        ayahs: surah.ayahs.map((ayah: any, i: number) => ({
          ...ayah,
          bnText: bnData[index].ayahs[i].text,
          enText: enData[index].ayahs[i].text,
        })),
      }));
      setAllSurahs(newData);
    };

    createData();
  }, []);
  useEffect(() => {
    if (!selectedSurah || !selectedAyat || selectedQuari === undefined) {
      const defaultSurah = surahs[0];
      const defaultAyat = 1;
      setSelectedSurah(defaultSurah);
      setSelectedAyat(defaultAyat);
      setLoading(true);
    } else if (selectedSurah && selectedAyat && selectedQuari !== undefined) {
      setLoading(true);
      const fetchAyatDetails = async () => {
        try {
          const url = `http://api.alquran.cloud/v1/ayah/${selectedSurah.number}:${selectedAyat}/${quari[selectedQuari]?.identifier}`;
          const res = await fetch(url);
          const data = await res.json();
          setAyatDetails(data.data);

          if (data.data.sajda.recommended === true) {
            alert("This ayah requires sajda, please perform sajda!");
          }

          if (data.data.audio) fetchAudio(data.data.audio);
        } catch (error) {
          console.error("Error fetching Ayat details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAyatDetails();
    }
  }, [selectedSurah, selectedAyat, selectedQuari, quari]);

  const playPrev = () => {
    if (ayatDetails?.numberInSurah > 1) {
      setSelectedAyat(ayatDetails.numberInSurah - 1);
    } else {
      const prevSurah =
        surahs[selectedSurah.number - 2] || surahs[surahs.length - 1];
      setSelectedSurah(prevSurah);
      setSelectedAyat(prevSurah.numberOfAyahs);
    }
  };

  const playNext = () => {
    if (ayatDetails?.numberInSurah < selectedSurah.numberOfAyahs) {
      setSelectedAyat(ayatDetails.numberInSurah + 1);
    } else {
      const nextSurah = surahs[selectedSurah.number] || surahs[0];
      setSelectedSurah(nextSurah);
      setSelectedAyat(1);
    }
  };

  const handlePlayButton = async () => {
    if (isPlaying) {
      await sound?.pauseAsync();
      setIsPlaying(false);
    } else {
      if (ayatDetails?.audio) {
        if (!sound) {
          await fetchAudio(ayatDetails.audio);
        }
        await sound?.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const fetchAudio = async (url: string) => {
    if (sound) await sound.unloadAsync();
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: false }
    );

    setSound(newSound);

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsPlaying(false);
      } else {
        setIsPlaying(status.isPlaying);
      }
    });
  };

  const router = useRouter();

  return (
    <LinearGradient
      colors={["#000814", "#0077b6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex h-screen-safe items-center justify-start">
        <View className="h-15 w-full flex flex-row items-center justify-between  p-5">
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
            <Icon name="cogs" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View className="bg-[#fff]/10  backdrop-blur-lg rounded-2xl p-5 text-primary  max-h-[80%] w-[90%]">
          <View className="flex items-center bg-[#edf2fb] rounded-2xl px-4 py-2 mb-4 flex-row justify-between">
            <TouchableOpacity
              className="flex flex-row justify-center items-center gap-2"
              onPress={handlePlayButton}
            >
              <Icon
                name={isPlaying ? "pause" : "play"}
                size={20}
                color="#081c15"
              />
              <Text className="font-bold text-primary-500">
                {isPlaying ? "Pause" : "Play"}
              </Text>
            </TouchableOpacity>

            <View className="flex items-center flex-row gap-3">
              <Text className="text-secondary-200 font-bold text-xl">
                {selectedSurah
                  ? `${selectedSurah?.englishName}`
                  : "Select Surah"}
              </Text>
            </View>

            <Text className="text-secondary-200 font-bold text-xl">
              {selectedSurah
                ? `${selectedAyat} / ${selectedSurah.numberOfAyahs}`
                : "Select Ayat"}
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <Text
                className="text-secondary-100 bg-[#edf2fb]/90 backdrop-blur-lg rounded-2xl p-2 mt-8"
                style={[styles.arabicText, { fontFamily: fonts[arabicFont] }]}
              >
                {
                  allSurahs[selectedSurah?.number - 1]?.ayahs[selectedAyat - 1]
                    ?.text
                }
              </Text>

              <Text className="text-secondary text-center font-semibold text-lg mt-2 mb-7">
                {selectedSurah
                  ? `${selectedSurah.number}:${selectedAyat}`
                  : "Select Ayat"}
              </Text>

              {showTranslationUrdu && (
                <>
                  <Text
                    className="text-secondary mb-10"
                    style={[
                      styles.translationText,
                      { fontFamily: "JameelNoori", fontSize: 28 },
                    ]}
                  >
                    {
                      allSurahs[selectedSurah?.number - 1]?.ayahs[
                        selectedAyat - 1
                      ]?.bnText
                    }
                  </Text>
                </>
              )}

              {showTranslationEnglish && (
                <>
                  <Text
                    className="text-secondary text-center leading-[26px]"
                    style={styles.translationText}
                  >
                    {
                      allSurahs[selectedSurah?.number - 1]?.ayahs[
                        selectedAyat - 1
                      ]?.enText
                    }
                  </Text>
                </>
              )}
            </ScrollView>
          )}
        </View>
        <View className="flex flex-row items-center absolute bottom-0 justify-around rounded-2xl py-4 w-[90%] m-3">
          <TouchableOpacity
            className="bg-[#edf2fb]/90 backdrop-blur-lg px-8 flex rounded-2xl justify-center flex-row w-40 py-4"
            onPress={playPrev}
          >
            <Icon name="arrow-left" size={20} color="#000814" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#edf2fb]/90 backdrop-blur-lg px-8 w-40 rounded-2xl flex justify-center flex-row py-4"
            onPress={playNext}
          >
            <Icon name="arrow-right" size={20} color="#000814" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  settingsPanel: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "#264653",
    padding: 20,
    elevation: 5,
    zIndex: 10,
  },
  arabicText: { fontSize: 30, textAlign: "center", marginBottom: 10 },
  translationText: {
    fontSize: 18,
    fontFamily: "Inter",
    textAlign: "center",
    margin: 5,
  },
});
export default Quran;
