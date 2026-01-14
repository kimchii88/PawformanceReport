import { CurrentReportInterface } from "@/components/ReportCard";
import { Dispatch, SetStateAction } from "react";

export const fetchWeather = async (setCurrentReport: Dispatch<SetStateAction<CurrentReportInterface>>) => {
    try {
        const position: GeolocationPosition = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=celsius`
        );
        const data = await response.json();
        const weatherCode = data.current.weather_code;
        const temp = Math.round(data.current.temperature_2m);
        let weather = "Sunny";
        if (weatherCode >= 61 && weatherCode <= 67) weather = "Rainy";
        else if (weatherCode >= 71 && weatherCode <= 77) weather = "Snowy";
        else if (weatherCode >= 51 && weatherCode <= 57) weather = "Rainy";
        else if (weatherCode >= 2 && weatherCode <= 3) weather = "Cloudy";
        else if (weatherCode >= 95) weather = "Rainy";
        else if (weatherCode === 0 || weatherCode === 1) weather = "Sunny";
        setCurrentReport((prev: CurrentReportInterface) => ({ ...prev, weather, temperature: `${temp}°C` }));
    } catch (error) {
        console.log("Weather fetch failed, using default", error);
    }
};
