'use client';
import { getWeatherLink } from '@/services/weatherLink';
import { useChosenCity } from '@/store/useChosenCity';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

const WeatherInfoBar = () => {
  const { chosenCity } = useChosenCity();
  const [dayShowing, setDayShowing] = useState(0);
  const [sixDaysInfo, setSixDaysInfo] = useState(new Map());

  const weather = useQuery({
    queryKey: [chosenCity.id],
    queryFn: async () => {
      const weatherLink = getWeatherLink(chosenCity.coord);
      if (!weatherLink) return null;

      const { data: fetchedWeather } = await axios.get(weatherLink);
      const sixDaysInfoKeys = [...sixDaysInfo.keys()];

      sixDaysInfoKeys.map((key) => {
        sixDaysInfo.set(key, []);
      });
      fetchedWeather.list.forEach((listInfoItem) => {
        const listInfoItemDat = listInfoItem.dt_txt.split(' ')[0];
        const mapDayWeather = sixDaysInfo.get(listInfoItemDat);
        if (!mapDayWeather?.length) {
          sixDaysInfo.set(listInfoItemDat, [listInfoItem]);
        }
        if (mapDayWeather?.length) {
          mapDayWeather?.push(listInfoItem);
        }
      });
      return fetchedWeather;
    },
  });
  console.log(sixDaysInfo);

  return <div>WeatherInfoBar</div>;
};

export default WeatherInfoBar;
