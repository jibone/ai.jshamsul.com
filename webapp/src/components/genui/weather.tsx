import { Cloud, Sun, CloudRain, CloudLightning, Wind } from "lucide-react";

type WeatherProps = {
  errorMsg: string;
  forecasts: {
    day: string;
    forecast: {
      summary: string;
      text: string;
    };
    temperature: {
      high: number;
      low: number;
    };
    relativeHumidity: {
      low: 55;
      high: 95;
    };
    wind: {
      speed: {
        low: number;
        high: number;
      };
      direction: string;
    };
  }[];
};

const getWeatherIcon = (text: string) => {
  switch (text) {
    case "Thundery Showers":
      return <CloudLightning className="w-12 h-12 text-yellow-400" />;
    case "Partly Cloudy (Day)":
      return <Cloud className="w-12 h-12 text-gray-400" />;
    case "Fair":
    case "Fair (Day)":
    case "Fair and Warm":
      return <Sun className="w-12 h-12 text-yellow-500" />;
    case "Light Rain":
    case "Moderate Rain":
    case "Heavy Rain":
    case "Showers":
      return <CloudRain className="w-12 h-12 text-blue-400" />;
    default:
      return <Cloud className="w-12 h-12 text-gray-400" />;
  }
};

const getBackgroundClass = (text: string) => {
  switch (text) {
    case "Thundery Showers":
      return "bg-gradient-to-br from-gray-800 to-gray-900";
    case "Partly Cloudy (Day)":
      return "bg-gradient-to-br from-blue-300 to-blue-400";
    case "Fair":
    case "Fair (Day)":
    case "Fair and Warm":
      return "bg-gradient-to-br from-yellow-200 to-yellow-400";
    case "Light Rain":
    case "Moderate Rain":
    case "Heavy Rain":
    case "Showers":
      return "bg-gradient-to-br from-blue-400 to-blue-600";
    default:
      return "bg-gradient-to-br from-gray-100 to-gray-300";
  }
};

export function Weather({ errorMsg, forecasts }: WeatherProps) {
  if (errorMsg !== "") {
    return <div>Error fetching data from API</div>;
  }

  return (
    <div className="flex">
      <div className="w-full max-w-4xl overflow-hidden rounded-lg shadow-xl">
        <div
          className={`p-6 ${getBackgroundClass(forecasts[0].forecast.text)} transition-all duration-500`}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">
            4-Day Weather Forecast
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {forecasts.map((day) => (
              <div
                key={day.day}
                className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-4 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {day.day}
                  </h3>
                  {getWeatherIcon(day.forecast.text)}
                </div>
                <p className="text-sm text-white mb-2">{day.forecast.text}</p>
                <p className="text-2xl font-bold text-white">
                  {day.temperature.high}°C
                </p>
                <p className="text-sm text-white mb-2">
                  Low: {day.temperature.low}°C
                </p>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-white flex items-center">
                    <span className="mr-1">💧</span>
                    Humidity: {day.relativeHumidity.low}% -{" "}
                    {day.relativeHumidity.high}%
                  </p>
                  <p className="text-xs text-white flex items-center">
                    <Wind className="w-3 h-3 mr-1" />
                    Wind: {day.wind.speed.low}-{day.wind.speed.high} km/h{" "}
                    {day.wind.direction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
