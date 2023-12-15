export interface WeatherDbData {
  id: number;
  name: string;
  cord: {
    lat: number;
    lon: number;
  };
  country: string;
}
