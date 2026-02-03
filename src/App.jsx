import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard.jsx";
import NotFoundCard from "./components/NotFoundCard.jsx";
import { fetchWeather } from "./lib/weatherService.js";
import { fetchCityImage } from "./lib/pixabayService.js";
import styled, { keyframes } from "styled-components";
import { Search, Cloud } from "react-feather";

// 애니메이션 정의
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AppContainer = styled.div`
    min-height: 100vh;
    padding: 2rem 2rem 5rem;
    max-width: 1400px;
    margin: 0 auto;
`;

const Header = styled.header`
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 0 1rem;

    @media (min-width: 768px) {
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
    }
`;

const Logo = styled.div`
    h1 {
        font-size: 2.5rem;
        font-weight: 900;
        margin: 0;
        letter-spacing: -0.03em;
        text-transform: uppercase;
        span {
            color: var(--page-color-point);
        }
    }
    p {
        margin: 0.25rem 0 0;
        color: var(--page-color-gray);
        font-weight: 500;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
`;

const SearchBar = styled.div`
    position: relative;
    width: 100%;
    max-width: 360px;

    svg {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        width: 1.25rem;
        height: 1.25rem;
        color: var(--page-color-light-gray);
    }

    button {
        position: absolute;
        right: 0.625rem;
        top: 50%;
        transform: translateY(-50%);
        background: var(--page-color-text);
        color: var(--page-color-white);
        border: none;
        border-radius: 0.75rem;
        padding: 0.4rem 0.9rem;
        font-size: 0.75rem;
        font-weight: 700;
        cursor: pointer;
        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    }

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    background: var(--page-color-white);
    border: 1px solid #e2e8f0;
    border-radius: 1.25rem;
    padding: 0.875rem 1.25rem 0.875rem 3rem;
    font-family: inherit;
    font-size: 0.95rem;
    box-shadow: var(--shadow-soft);
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: var(--page-color-point);
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }
`;

const MainContent = styled.main`
    /* 스타일 추가 */
`;

const CityGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2.5rem;
    padding: 1rem;
`;

const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5rem 0;
    color: var(--page-color-gray);
    text-align: center;
    grid-column: 1 / -1;
`;

const EmptyIconCircle = styled.div`
    width: 5rem;
    height: 5rem;
    background-color: var(--page-color-white);
    border: 1px solid #f1f5f9;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    svg {
        width: 2.5rem;
        height: 2.5rem;
        opacity: 0.2;
    }
`;

const LoadingCard = styled.div`
    position: relative;
    height: 460px;
    border-radius: 2.5rem;
    background: var(--page-color-white);
    border: 1px dashed #e2e8f0;
    animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    display: flex;
    align-items: center;
    justify-content: center;

    .inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;

        span {
            color: var(--page-color-light-gray);
            font-size: 0.875rem;
            font-weight: 500;
        }
    }
`;

const Spinner = styled.div`
    width: 3rem;
    height: 3rem;
    border: 4px solid rgba(59, 130, 246, 0.3);
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`;

const App = () => {
    const [cities, setCities] = useState([]); //갤러리 도시 데이터
    const [searchQuery, setSearchQuery] = useState(""); //입력값
    const [loading, setLoading] = useState(false); //로딩중

    //초기 로딩
    //localStorage에 데이터가 있다면 가져와라
    useEffect(() => {
        const saved = localStorage.getItem("weather_gallery_owm");
        if (saved) {
            setCities(JSON.parse(saved));
        }
    }, []);

    //상태 저장
    //도시 변경시 localStorage 동기화
    useEffect(() => {
        localStorage.setItem("weather_gallery_owm", JSON.stringify(cities));
    }, [cities]);

    //도시 추가(갤러리 추가)
    const handleAddCity = async (cityName) => {
        if (!cityName.trim()) return; //빈 문자열 방지

        //로딩중
        setLoading(true);

        try {
            const weatherData = await fetchWeather(cityName); //날씨
            const imageUrl = await fetchCityImage(cityName); //이미지

            //성공
            const newCity = {
                ...weatherData,
                type: "newCity",
                id: Date.now().toString(),
                imageUrl,
            };

            setCities((prev) => [newCity, ...prev]); //새로운 도시를 앞으로
            setSearchQuery(""); //검색창 빈칸 만들기
        } catch (err) {
            //실패
            const notFoundCity = {
                type: "notFoundCity",
                id: Date.now().toString(),
                query: cityName,
            };

            setCities((prev) => [notFoundCity, ...prev]);
            setSearchQuery("");
        } finally {
            setLoading(false);
        }
    };

    //삭제
    const removeCity = (id) => {
        setCities((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <AppContainer>
            <Header>
                <Logo>
                    <h1>
                        Weather <span>Gallery</span>
                    </h1>
                    <p>Weather Dashboard</p>
                </Logo>

                <SearchBar>
                    <Search />

                    <SearchInput
                        type="text"
                        placeholder="Add a City..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddCity(searchQuery)}
                    />
                    <button onClick={() => handleAddCity(searchQuery)} disabled={loading}>
                        {loading ? "..." : "ADD"}
                    </button>
                </SearchBar>
            </Header>

            <MainContent>
                {cities.length === 0 && !loading ? (
                    <EmptyState>
                        <EmptyIconCircle>
                            <Cloud />
                        </EmptyIconCircle>
                        <p style={{ fontSize: "1.125rem", fontWeight: 500, marginBottom: "0.25rem" }}>Your gallery is empty.</p>
                        <p style={{ fontSize: "0.875rem" }}>Search for a city to start building your dashboard.</p>
                    </EmptyState>
                ) : (
                    <CityGrid>
                        {loading && searchQuery && (
                            <LoadingCard>
                                <div className="inner">
                                    <Spinner />
                                    <span>LOADING {searchQuery}...</span>
                                </div>
                            </LoadingCard>
                        )}

                        {cities.map((city) => {
                            if (city.type === "notFoundCity") {
                                return <NotFoundCard key={city.id} query={city.query} not={city} onDelete={removeCity} />;
                            } else if (city.type === "newCity") {
                                return <WeatherCard key={city.id} weather={city} onDelete={removeCity} />;
                            }
                        })}
                    </CityGrid>
                )}
            </MainContent>
        </AppContainer>
    );
};

export default App;
