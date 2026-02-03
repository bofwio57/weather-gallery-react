const OWM_API_KEY = import.meta.env.VITE_OWM_API_KEY; // 사용자의 키가 없을 경우를 대비해 안내 필요

export const fetchWeather = async (city) => {
    // try {
    // 1. 현재 날씨 데이터 가져오기
    const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${OWM_API_KEY}`);
    if (!currentRes.ok) throw new Error("City not found");
    const current = await currentRes.json();

    // 2. 5일 예보 데이터 가져오기
    const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${OWM_API_KEY}`,
    );
    const forecastData = await forecastRes.json();

    // 5일 예보 중 하루에 하나씩 필터링 (12:00 기준 데이터 추출)
    const dailyForecast = forecastData.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .slice(0, 5)
        .map((item) => ({
            day: new Date(item.dt * 1000).toLocaleDateString("ko-KR", { weekday: "long" }),
            temp: item.main.temp,
            condition: item.weather[0].main,
        }));

    return {
        city: `${current.name}, ${current.sys.country}`,
        temp: current.main.temp,
        condition: current.weather[0].main,
        description: current.weather[0].description,
        high: current.main.temp_max,
        low: current.main.temp_min,
        humidity: current.main.humidity,
        windSpeed: current.wind.speed,
        visibility: (current.visibility / 1000).toFixed(1) + " KM",
        sunrise: new Date(current.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sunset: new Date(current.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        forecast: dailyForecast,
    };
};
