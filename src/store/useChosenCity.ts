import { WeatherDbData } from '@/models/weatherDbData';
import { create } from 'zustand';

interface ChosenCityState {
  chosenCity: WeatherDbData;
  setChosenCity: (newCity: WeatherDbData) => void;
}

export const useChosenCity = create<ChosenCityState>((set) => ({
  chosenCity: {
    id: 0,
    name: '',
    cord: {
      lat: 0,
      lon: 0,
    },
  } as WeatherDbData,
  setChosenCity: (newCity: WeatherDbData) =>
    set(() => {
      return { chosenCity: newCity };
    }),
}));
