import { Sun, Cloud, CloudRain, Snowflake, Wind } from "lucide-react";

export type WeatherType = "Sunny" | "Cloudy" | "Rainy" | "Snowy" | "Windy";

interface WeatherIcon {
    weather: WeatherType;
    size?: string;
}

export default function WeatherIcon({ weather, size = "w-12 h-12" }: WeatherIcon) {
    const icons = {
        Sunny: <Sun className={`${size} text-yellow-500`} />,
        Cloudy: <Cloud className={`${size} text-gray-400`} />,
        Rainy: <CloudRain className={`${size} text-blue-500`} />,
        Snowy: <Snowflake className={`${size} text-blue-300`} />,
        Windy: <Wind className={`${size} text-gray-500`} />,
    };
    return icons[weather] || icons["Sunny"];
}
