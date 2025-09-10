export type Stat = {
  label: string;
  key: "temperature" | "windspeed" | "humidity" | "precipitation";
  value: string | number | null;
};

export const stats: Stat[] = [
  { label: "Feels Like", key: "temperature", value: null },
  { label: "Humidity", key: "humidity", value: null },
  { label: "Wind", key: "windspeed", value: null },
  { label: "Precipitation", key: "precipitation", value: null },
];

export function mapWeatherToStats(
  weather: Partial<Record<Stat["key"], number | null>>
): Stat[] {
  return stats.map((stat) => ({
    ...stat,
    value: weather[stat.key] ?? "-",
  }));
}
