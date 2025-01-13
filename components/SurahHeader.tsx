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
}

interface HeaderProps {
  style?: React.CSSProperties;
  fonts: string[];
  setArabicFont: (fontIndex: number) => void;
}

const SurahHeader: React.FC<HeaderProps> = ({
  fonts,
  setArabicFont,
}) => {
  const [selectedFontIndex, setSelectedFontIndex] = useState<number>(0);
  const [fontModalVisible, setFontModalVisible] = useState<boolean>(false);

  const handleFontChange = (fontIndex: string) => {
    const index = parseInt(fontIndex);
    setSelectedFontIndex(index);
    setArabicFont(index);
    setFontModalVisible(false);
  };

  return (
    <View style={styles.container}>
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

export default SurahHeader;

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
