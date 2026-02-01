const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
// CRA면 process.env.REACT_APP_PIXABAY_API_KEY

export const fetchCityImage = async (cityName) => {
    const query = encodeURIComponent(`${cityName} city skyline`);

    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&orientation=horizontal&category=places&per_page=3&safesearch=true`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Pixabay API 요청 실패");
    }

    const data = await res.json();

    if (!data.hits || data.hits.length === 0) {
        throw new Error("도시 이미지 없음");
    }

    // 가장 고화질 이미지 사용
    return data.hits[0].largeImageURL;
};
