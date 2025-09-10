import WeatherSearch from "./WeatherSearch";

type Props = {};

export default function Hero({}: Props) {
  return (
    <div className="font-dmsans">
      <h1 className="text-5xl font-bricolage text-center">
        How's the sky looking today?
      </h1>
      <WeatherSearch />
    </div>
  );
}
