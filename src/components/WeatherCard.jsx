import React, { useState } from "react";
import { WeatherIcon, WindIcon, DropIcon, VisibilityIcon, PinIcon } from "./Icons.jsx";
import styled, { keyframes } from "styled-components";

const DeleteBtn = styled.button`
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    z-index: 10;
    background: #1e293b;
    color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    cursor: pointer;
    opacity: 0;
    transition: all 0.35s;

    &:hover {
        transform: rotate(90deg);
        background: #ef4444;
    }
`;
const CardWrapper = styled.div`
    perspective: 1500px;
    height: 460px;
    position: relative;
    &:hover ${DeleteBtn} {
        opacity: 1;
    }
`;
const CardInner = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
    cursor: pointer;

    &.is-flipped {
        transform: rotateY(180deg);
    }
`;

const CardFace = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 2.5rem;
    overflow: hidden;
    box-shadow: var(--shadow-soft);
`;

const CardFront = styled(CardFace)`
    background: white;
`;

const CardBack = styled(CardFace)`
    background: #ffffff;
    transform: rotateY(180deg);
    padding: 2rem;
    display: flex;
    flex-direction: column;
`;

const CardBgImg = styled.img`
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const InfoPanel = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: var(--glass-overlay);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(16px);
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
`;

// --- 내부 세부 스타일 ---

const CityBadge = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    opacity: 0.8;
    margin-bottom: 1rem;

    span {
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }
`;

const MainTemp = styled.div`
    font-size: 5.5rem;
    font-weight: 500;
    line-height: 1;
    p {
        position: relative;
        display: inline;

        .degree {
            position: absolute;
            top: 0.8rem;
            right: -2.5rem;
            font-size: 2rem;
        }
    }
`;

const ConditionRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;

    .divider {
        width: 1px;
        height: 1rem;
        background: rgba(255, 255, 255, 0.3);
    }

    span {
        font-size: 0.65rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
`;

const DetailInfoList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const DetailItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    span {
        font-size: 0.7rem;
        font-weight: 600;
    }
`;

// --- Back Side 전용 스타일 ---

const BackHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    h3 {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 800;
        text-transform: uppercase;
        color: #94a3b8;
    }
    p {
        margin: 0.2rem 0 0;
        font-size: 0.75rem;
        color: #64748b;
        font-weight: 500;
    }
`;

const SunGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
`;

const SunBox = styled.div`
    background: #f8fafc;
    padding: 0.75rem;
    border-radius: 1.25rem;
    text-align: center;

    .label {
        margin: 0;
        font-size: 0.55rem;
        color: #94a3b8;
        font-weight: 800;
        text-transform: uppercase;
    }
    .time {
        margin: 0.2rem 0 0;
        font-size: 0.75rem;
        font-weight: 700;
    }
`;

const ForecastBox = styled.div`
    flex: 1;
    background: #f8fafc;
    border-radius: 1.75rem;
    padding: 1.25rem;
    overflow: hidden;

    h4 {
        margin: 0 0 1rem;
        font-size: 0.65rem;
        font-weight: 800;
        text-transform: uppercase;
        color: #94a3b8;
        border-bottom: 1px solid #e2e8f0;
        padding-bottom: 0.5rem;
    }
`;

const ForecastRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .day {
        width: 2rem;
        font-size: 0.7rem;
        font-weight: 700;
        color: #64748b;
    }
    .temp {
        width: 2rem;
        text-align: right;
        font-size: 0.7rem;
        font-weight: 700;
    }
`;

const FlipFooter = styled.p`
    text-align: center;
    font-size: 0.55rem;
    font-weight: 800;
    color: #cbd5e1;
    margin-top: 1rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
`;

const WeatherCard = ({ weather, onDelete }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <CardWrapper>
            <DeleteBtn
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(weather.id);
                }}
            >
                <svg style={{ width: "2.5rem", height: "2.5rem" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </DeleteBtn>

            <CardInner className={isFlipped ? "is-flipped" : ""} onClick={handleFlip}>
                {/* FRONT SIDE */}
                <CardFront>
                    <CardBgImg src={weather.imageUrl} alt={weather.city} />
                    <InfoPanel>
                        <div>
                            <CityBadge>
                                <PinIcon style={{ width: "0.9rem", height: "0.9rem" }} />
                                <span>{weather.city}</span>
                            </CityBadge>
                            <MainTemp>
                                <p>
                                    {Math.round(weather.temp)}
                                    <span className="degree">°</span>
                                </p>
                            </MainTemp>
                            <ConditionRow>
                                <WeatherIcon condition={weather.condition} style={{ width: "1.2rem", height: "1.2rem" }} />
                                <div className="divider" />
                                <span>{weather.condition}</span>
                            </ConditionRow>
                        </div>

                        <DetailInfoList>
                            <DetailItem>
                                <WindIcon style={{ width: "1.1rem", height: "1.1rem", opacity: 0.7 }} />
                                <span>{weather.windSpeed} KM/H</span>
                            </DetailItem>
                            <DetailItem>
                                <DropIcon style={{ width: "1.1rem", height: "1.1rem", opacity: 0.7 }} />
                                <span>{weather.humidity} %</span>
                            </DetailItem>
                            <DetailItem>
                                <VisibilityIcon style={{ width: "1.1rem", height: "1.1rem", opacity: 0.7 }} />
                                <span>{weather.visibility}</span>
                            </DetailItem>
                        </DetailInfoList>
                    </InfoPanel>
                </CardFront>

                {/* BACK SIDE */}
                <CardBack>
                    <BackHeader>
                        <div>
                            <h3>{weather.city}</h3>
                            <p>{weather.description}</p>
                        </div>
                        <WeatherIcon condition={weather.condition} style={{ width: "1.5rem", height: "1.5rem", color: "#cbd5e1" }} />
                    </BackHeader>

                    <SunGrid>
                        <SunBox>
                            <p className="label">Sunrise</p>
                            <p className="time">{weather.sunrise}</p>
                        </SunBox>
                        <SunBox>
                            <p className="label">Sunset</p>
                            <p className="time">{weather.sunset}</p>
                        </SunBox>
                    </SunGrid>

                    <ForecastBox>
                        <h4>5-Day Forecast</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                            {weather.forecast.map((day, i) => (
                                <ForecastRow key={i}>
                                    <span className="day">{day.day}</span>
                                    <WeatherIcon condition={day.condition} style={{ width: "1rem", height: "1rem", color: "#cbd5e1" }} />
                                    <span className="temp">{Math.round(day.temp)}°</span>
                                </ForecastRow>
                            ))}
                        </div>
                    </ForecastBox>
                    <FlipFooter>Tap to flip back</FlipFooter>
                </CardBack>
            </CardInner>
        </CardWrapper>
    );
};

export default WeatherCard;
