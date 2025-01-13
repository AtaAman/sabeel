import React, { createContext, useContext, useState, useEffect } from "react";

type QuranContextType = {
  allSurahs: any[];
  selectedSurah: any;
  setSelectedSurah: (surah: any) => void;
  selectedAyat: number;
  setSelectedAyat: (ayat: number) => void;
  selectedQuari: number;
  setSelectedQuari: (quari: number) => void;
  quari: any[];
  setQuari: (quari: any[]) => void;
  arabicFont: number;
  setArabicFont: (font: number) => void;
  showTranslationUrdu: boolean;
  setShowTranslationUrdu: (show: boolean) => void;
  showTranslationEnglish: boolean;
  setShowTranslationEnglish: (show: boolean) => void;
};

const QuranContext = createContext<QuranContextType | undefined>(undefined);

export const QuranProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allSurahs, setAllSurahs] = useState<any[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<any>();
  const [selectedAyat, setSelectedAyat] = useState<number>(1);
  const [selectedQuari, setSelectedQuari] = useState<number>(6);
  const [quari, setQuari] = useState<any[]>([]);
  const [arabicFont, setArabicFont] = useState(0);
  const [showTranslationUrdu, setShowTranslationUrdu] = useState(true);
  const [showTranslationEnglish, setShowTranslationEnglish] = useState(true);
  
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

  useEffect(() => {
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

  

  return (
    <QuranContext.Provider
      value={{
        allSurahs,
        selectedSurah,
        setSelectedSurah,
        selectedAyat,
        setSelectedAyat,
        selectedQuari,
        setSelectedQuari,
        quari,
        setQuari,
        arabicFont,
        setArabicFont,
        showTranslationUrdu,
        setShowTranslationUrdu,
        showTranslationEnglish,
        setShowTranslationEnglish,
      }}
    >
      {children}
    </QuranContext.Provider>
  );
};

export const useQuran = (): QuranContextType => {
  const context = useContext(QuranContext);
  if (!context) {
    throw new Error("useQuran must be used within a QuranProvider");
  }
  return context;
};
