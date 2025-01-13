import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Surah {
  number: number;
  englishName: string;
  name: string;
  numberOfAyahs: number;
}

interface HeaderProps {
  style?: React.CSSProperties;
  surahs: Surah[];
  selectedSurah: Surah | null;
  setSelectedSurah: (surah: Surah | null) => void;
  selectedAyat: number;
  setSelectedAyat: (ayat: number) => void;
  fonts: string[];
  setArabicFont: (fontIndex: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  surahs,
  selectedSurah,
  setSelectedSurah,
  selectedAyat,
  setSelectedAyat,
  fonts,
  setArabicFont,
}) => {
  const [selectedFontIndex, setSelectedFontIndex] = useState<number>(0);
  const [surahModalVisible, setSurahModalVisible] = useState<boolean>(false);
  const [ayatModalVisible, setAyatModalVisible] = useState<boolean>(false);
  const [fontModalVisible, setFontModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (surahs && surahs.length > 0 && !selectedSurah) {
      setSelectedSurah(surahs[0]);
    }
  }, [surahs, setSelectedSurah, selectedSurah]);

  const handleSurahChange = (surah: Surah) => {
    setSelectedSurah(surah);
    setSelectedAyat(1);
    setSurahModalVisible(false);
  };

  const handleAyatChange = (ayatNumber: string) => {
    setSelectedAyat(parseInt(ayatNumber));
    setAyatModalVisible(false);
  };

  const handleFontChange = (fontIndex: string) => {
    const index = parseInt(fontIndex);
    setSelectedFontIndex(index);
    setArabicFont(index);
    setFontModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Surah Selector */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Surah</Text>
        <TouchableOpacity
          onPress={() => setSurahModalVisible(true)}
          style={styles.selectButton}
        >
          <Text style={styles.selectedSurahText}>
            {selectedSurah
              ? `${selectedSurah.number}. ${selectedSurah.englishName} - ${selectedSurah.name}`
              : "Select Surah"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal to Select Surah */}
      <Modal
        visible={surahModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={surahs}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSurahChange(item)}
                  style={styles.modalItem}
                >
                  <Text style={styles.modalItemText}>
                    {`${item.number}. ${item.englishName} - ${item.name}`}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.number.toString()}
            />
            <TouchableOpacity
              onPress={() => setSurahModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Ayat Selector */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Ayat</Text>
        <TouchableOpacity
          onPress={() => setAyatModalVisible(true)}
          style={styles.selectButton}
        >
          <Text style={styles.selectedSurahText}>{`Ayat ${selectedAyat}`}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal to Select Ayat */}
      <Modal
        visible={ayatModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={Array.from(
                { length: selectedSurah?.numberOfAyahs || 0 },
                (_, i) => i + 1
              )}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleAyatChange(item.toString())}
                  style={styles.modalItem}
                >
                  <Text style={styles.modalItemText}>{`Ayat ${item}`}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.toString()}
            />
            <TouchableOpacity
              onPress={() => setAyatModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Arabic Font Selector */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Arabic Font</Text>
        <TouchableOpacity
          onPress={() => setFontModalVisible(true)}
          style={styles.selectButton}
        >
          <Text style={styles.selectedSurahText}>
            {fonts[selectedFontIndex]}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal to Select Arabic Font */}
      <Modal
        visible={fontModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={fonts}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => handleFontChange(index.toString())}
                  style={styles.modalItem}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
              onPress={() => setFontModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 20,
    backgroundColor: "#000",
    opacity: 0.5,
    elevation: 5,
    shadowColor: "#000",
    borderRadius: 16,
  },
  pickerContainer: {
    marginBottom:0,
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
  },
  selectButton: {
    padding: 10,
    backgroundColor: "#dad7cd",
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedSurahText: {
    color: "black",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "92%",
    height: "80%",
    backgroundColor: "#031911",
    borderRadius: 8,
    padding: 30,
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalItemText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "#264653",
    padding: 10,
    borderRadius: 8,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#dad7cd",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "black",
    fontSize: 16,
  },
});
