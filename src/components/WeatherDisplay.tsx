import { mapWeatherToStats, type Stat } from "@/data/stats";

type DailyForecast = {
  date: string;
  temperatureMax: number | null;
  temperatureMin: number | null;
  precipitation: number | null;
};

type HourlyForecast = {
  time: string;
  temperature: number | null;
  humidity: number | null;
  windspeed: number | null;
  precipitation: number | null;
};

type Props = {
  weather: {
    temperature: number | null;
    windspeed: number | null;
    winddirection?: number | null;
    weathercode?: number | null;
    time?: string;
    humidity: number | null;
    precipitation: number | null;
  };
  daily: DailyForecast[];
  hourly: HourlyForecast[];
  city: string;
};

export default function WeatherDisplay({
  weather,
  daily,
  hourly,
  city,
}: Props) {
  const { temperature, windspeed, humidity, precipitation } = weather;

  const stats: Stat[] = mapWeatherToStats({
    temperature,
    windspeed,
    humidity,
    precipitation,
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto mt-8 px-2 sm:px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 🌤 Main + Daily */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Main card */}
          <div className="h-48 sm:h-56 rounded-xl bg-[url(/bg-today-large.svg)] bg-gray-800 flex items-center justify-center">
            {city && (
              <div className="p-4 rounded-xl text-center">
                <p className="text-xl sm:text-2xl font-bold capitalize">
                  {city}
                </p>
                <p className="text-5xl sm:text-6xl font-extrabold mt-2">
                  {temperature !== null ? `${temperature}°C` : "—"}
                </p>
              </div>
            )}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col justify-center items-center gap-2 h-20 rounded-xl bg-gray-900 p-3"
              >
                <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
                <p className="text-base">{stat.value ?? "—"}</p>
              </div>
            ))}
          </div>

          {/* Daily forecast */}
          <div className="flex flex-col gap-4">
            <h3 className="text-gray-300 font-semibold text-base sm:text-lg">
              Daily Forecast
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-4">
              {daily.map((day, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-center items-center gap-2 h-24 sm:h-28 rounded-xl bg-gray-800 p-2 sm:p-3"
                >
                  <p className="text-xs sm:text-sm text-gray-400">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <div className="flex gap-2 sm:gap-3 justify-between">
                    <span className="text-xs text-white/80">
                      {day.temperatureMax !== null
                        ? `${day.temperatureMax}°`
                        : "—"}
                    </span>
                    <span className="text-xs text-white/60">
                      {day.temperatureMin !== null
                        ? `${day.temperatureMin}°`
                        : "—"}
                    </span>
                  </div>
                  <p className="text-xs text-blue-300">
                    💧{" "}
                    {day.precipitation !== null
                      ? `${day.precipitation}mm`
                      : "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ⏳ Hourly forecast */}
        <div className="lg:col-span-4 flex flex-col gap-4 bg-gray-900 p-3 sm:p-4 rounded-xl mt-4 lg:mt-0">
          <h3 className="mb-2 text-gray-400 font-semibold text-base sm:text-lg">
            Hourly Forecast
          </h3>
          <div className="flex flex-col gap-2 max-h-[300px] sm:max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            {hourly.map((hour, i) => (
              <div
                key={i}
                className="flex items-center justify-between h-10 sm:h-12 rounded-lg bg-gray-800 px-2 sm:px-3"
              >
                <span className="text-xs sm:text-sm text-gray-300">
                  {new Date(hour.time).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {hour.temperature !== null ? `${hour.temperature}°C` : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
