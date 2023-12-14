interface WeatherLink {
  lat: number;
  lon: number;
}

export function getWeatherLink({ lat, lon }: WeatherLink) {
  const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  if (!weatherApiKey) {
    console.error('날씨 API Key를 찾을 수 없습니다.');
    return null;
  }
  return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;
}
