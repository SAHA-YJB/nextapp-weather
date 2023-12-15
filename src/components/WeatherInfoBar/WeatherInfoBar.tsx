'use client';
import { WeatherListElement, WeatherRequest } from '@/models/weatherRequest';
import { getWeatherLink } from '@/services/weatherLink';
import { useChosenCity } from '@/store/useChosenCity';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import DaySelectBtnRow from '../DaySelectBtnRow/DaySelectBtnRow';
import DayWeatherInfo from '../DayWeatherInfo/DayWeatherInfo';

const WeatherInfoBar = () => {
  const { chosenCity } = useChosenCity();
  const [dayShowing, setDayShowing] = useState(0);
  const [sixDaysInfo, setSixDaysInfo] = useState(
    // <키타입, 밸류타입>
    new Map<string, WeatherListElement[]>()
  );

  const weather = useQuery({
    queryKey: [chosenCity.id],
    queryFn: async () => {
      const weatherLink = getWeatherLink(chosenCity.coord);
      if (!weatherLink) return null;

      const { data: fetchedWeather } = await axios.get<WeatherRequest>(
        weatherLink
      );
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

  if (weather.isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  return (
    <div
      className={`weatherInfoBar w-full h-full gap-8 flex flex-grow flex-col`}
    >
      <h4
        className={`weatherInfoBar__citySelected font-bold text-[1.5rem] text-sky-700`}
      >
        도시: {weather?.data?.city.name}
      </h4>
      <DaySelectBtnRow
        dayShowing={dayShowing}
        sixDaysInfo={sixDaysInfo}
        setDayShowing={setDayShowing}
      />
      <div className={`w-full h-full weatherInfoBar__infoList`}>
        {[...sixDaysInfo.keys()].map((key, index) => {
          const dayInfo = sixDaysInfo.get(key);
          if (dayInfo && index === dayShowing) {
            return <DayWeatherInfo key={key} weatherInfo={dayInfo} />;
          } else {
            return <Fragment key={key}></Fragment>;
          }
        })}
      </div>
    </div>
  );
};

export default WeatherInfoBar;
