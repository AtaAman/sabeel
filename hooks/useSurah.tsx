import { useEffect, useState } from "react";

const useSurahs = () => {
    const [surahs, setSurahs] = useState<any[]>([]);

    useEffect(() => {
        const getSurahs = async () => {
            const res = await fetch("https://api.alquran.cloud/v1/surah");
            const data = await res.json();
            setSurahs(data.data);
        };
        getSurahs();
    }, []);

    return { surahs, setSurahs };
};

export default useSurahs;
