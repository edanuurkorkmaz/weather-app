import { Search } from "lucide-react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import WeatherDisplay from "./WeatherDisplay";
import Loading from "./Loading";

type DailyForecast = {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  precipitation: number;
};

type HourlyForecast = {
  time: string;
  temperature: number;
  humidity: number;
  windspeed: number;
  precipitation: number;
};

type CurrentWeather = {
  temperature: number;
  windspeed: number;
  humidity: number;
  precipitation: number;
};

export default function WeatherSearch() {
  // 🔹 input ayrı state
  const [searchCity, setSearchCity] = useState<string>("");
  // 🔹 display için ayrı city
  const [city, setCity] = useState<string>("");

  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [daily, setDaily] = useState<DailyForecast[]>([]);
  const [hourly, setHourly] = useState<HourlyForecast[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    if (!searchCity.trim()) return;

    setLoading(true);
    // 🔹 Arama başladığında ekranı temizle
    setWeather(null);
    setDaily([]);
    setHourly([]);
    setCity("");

    try {
      // 1. Geocoding API
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchCity}`
      );
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        Swal.fire({
          title: "Error!",
          text: "City not found",
          icon: "error",
          confirmButtonText: "Try Again",
        });
        return;
      }

      const { latitude, longitude, name } = data.results[0];

      // 2. Weather API
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&current=temperature_2m,is_day,wind_speed_10m,relative_humidity_2m,precipitation&timezone=auto`
      );

      const weatherData = await weatherResponse.json();

      // 3. Current
      setWeather({
        temperature: weatherData.current.temperature_2m,
        windspeed: weatherData.current.wind_speed_10m,
        humidity: weatherData.current.relative_humidity_2m,
        precipitation: weatherData.current.precipitation,
      });

      // 4. Daily
      setDaily(
        weatherData.daily.time.map((t: string, i: number) => ({
          date: t,
          temperatureMax: weatherData.daily.temperature_2m_max[i],
          temperatureMin: weatherData.daily.temperature_2m_min[i],
          precipitation: weatherData.daily.precipitation_sum[i],
        }))
      );

      // 5. Hourly (ilk 24 saat)
      setHourly(
        weatherData.hourly.time.slice(0, 24).map((t: string, i: number) => ({
          time: t,
          temperature: weatherData.hourly.temperature_2m[i],
          humidity: weatherData.hourly.relative_humidity_2m[i],
          windspeed: weatherData.hourly.wind_speed_10m[i],
          precipitation: weatherData.hourly.precipitation[i],
        }))
      );

      // 🔹 input’ta yazılan şehir → display’e aktar
      setCity(name);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch weather data",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-8">
      {/* 🔍 Search Form */}
      <form onSubmit={handleSearch} className="flex gap-4">
        <span className="flex items-center gap-2 w-120 h-12 border border-slate-300 dark:border-slate-600 rounded-xl bg-gray-900">
          <Search className="ml-4" />
          <input
            onChange={(e) => setSearchCity(e.target.value)}
            className="outline-none w-100 bg-transparent text-white"
            placeholder="Search for a place..."
            value={searchCity}
            type="search"
          />
        </span>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 rounded-xl w-30 h-12 text-white cursor-pointer hover:bg-blue-700 ease-in-out transition-transform duration-200"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {/* ⏳ Loading */}
      {loading && <Loading />}

      {/* 🌤 Weather Display */}
      {!loading && weather && (
        <WeatherDisplay
          weather={weather}
          city={city}
          daily={daily}
          hourly={hourly}
        />
      )}
    </div>
  );
}
