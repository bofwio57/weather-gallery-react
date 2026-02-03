import React from "react";
import { Cloud, Sun, CloudRain, CloudSnow, Wind } from "react-feather";

export const WeatherIcon = ({ condition, size = 18 }) => {
    const c = condition?.toLowerCase() || "";

    if (c.includes("sun") || c.includes("clear")) return <Sun size={size} />;

    if (c.includes("rain") || c.includes("drizzle") || c.includes("shower")) return <CloudRain size={size} />;

    if (c.includes("snow") || c.includes("ice")) return <CloudSnow size={size} />;

    if (c.includes("wind")) return <Wind size={size} />;

    return <Cloud size={size} />;
};
