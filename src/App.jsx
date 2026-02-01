import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard.jsx";
import NotFoundCard from "./components/NotFoundCard.jsx";
import { fetchWeather } from "./lib/weatherService.js";
import { fetchCityImage } from "./lib/pixabayService.js";
import styled, { keyframes } from "styled-components";

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
    padding: 2rem 1rem 5rem;
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
        font-weight: 800;
        margin: 0;
        letter-spacing: -0.03em;
        span {
            color: var(--accent-color);
        }
    }
    p {
        margin: 0.25rem 0 0;
        color: var(--text-muted);
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
        color: #94a3b8;
    }

    button {
        position: absolute;
        right: 0.625rem;
        top: 50%;
        transform: translateY(-50%);
        background: var(--text-main);
        color: white;
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
`;

const SearchInput = styled.input`
    width: 100%;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 1.25rem;
    padding: 0.875rem 1.25rem 0.875rem 3rem;
    font-family: inherit;
    font-size: 0.95rem;
    box-shadow: var(--shadow-soft);
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }
`;

const MainContent = styled.main`
    /* 필요한 스타일 추가 */
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
    color: #64748b;
    text-align: center;
    grid-column: 1 / -1;
`;

const EmptyIconCircle = styled.div`
    width: 5rem;
    height: 5rem;
    background-color: white;
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
    height: 480px;
    border-radius: 2.5rem;
    background: white;
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
            color: #94a3b8;
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

const FloatingButton = styled.button`
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 4rem;
    height: 4rem;
    background: var(--accent-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 15px 30px -5px rgba(59, 130, 246, 0.5);
    border: 4px solid white;
    cursor: pointer;
    z-index: 100;

    @media (min-width: 768px) {
        display: none;
    }
`;

const App = () => {
    const [cities, setCities] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("weather_gallery_owm");
        if (saved) {
            setCities(JSON.parse(saved));
        } else {
            handleAddCity("Seoul");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("weather_gallery_owm", JSON.stringify(cities));
    }, [cities]);

    const handleAddCity = async (cityName) => {
        if (!cityName.trim()) return;

        setLoading(true);
        // setError(null);

        try {
            const weatherData = await fetchWeather(cityName);
            const imageUrl = await fetchCityImage(cityName);

            const newCity = {
                ...weatherData,
                type: "newCity",
                id: Date.now().toString(),
                imageUrl,
            };

            setCities((prev) => [newCity, ...prev]);
            setSearchQuery("");
        } catch (err) {
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
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                                />
                            </svg>
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

            <FloatingButton
                onClick={() => {
                    const city = prompt("도시 이름을 입력하세요:");
                    if (city) handleAddCity(city);
                }}
            >
                <svg style={{ width: "2rem", height: "2rem" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </FloatingButton>
        </AppContainer>
    );
};

export default App;
