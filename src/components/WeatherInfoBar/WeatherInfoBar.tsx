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
  // 선택된 도시를 가져옵니다.
  const { chosenCity } = useChosenCity();
  // 현재 보여지는 날짜와 6일간의 날씨 정보를 저장할 상태를 생성합니다.
  const [dayShowing, setDayShowing] = useState(0);
  const [sixDaysInfo, setSixDaysInfo] = useState(
    new Map<string, WeatherListElement[]>()
  );

  const weather = useQuery({
    queryKey: [chosenCity.id],
    queryFn: async () => {
      const weatherLink = getWeatherLink(chosenCity.coord);
      if (!weatherLink) return null;

      // 날씨 정보를 가져옴
      const { data: fetchedWeather } = await axios.get<WeatherRequest>(
        weatherLink
      );

      // 가져온 날씨 정보를 순회
      fetchedWeather.list.forEach((listInfoItem) => {
        // listInfoItem에서 날짜 정보만 가져옴
        const listInfoItemDate = listInfoItem.dt_txt.split(' ')[0];
        // 현재 날짜에 해당하는 날씨 정보를 sixDaysInfo에서 가져옴
        const mapDayWeather = sixDaysInfo.get(listInfoItemDate);
        // 만약 현재 날짜에 해당하는 날씨 정보가 아직 없다면,
        // 새로운 배열을 만들어서 현재 아이템의 날씨 정보를 추가
        if (!mapDayWeather?.length) {
          sixDaysInfo.set(listInfoItemDate, [listInfoItem]);
        }
        // 만약 현재 날짜에 해당하는 날씨 정보가 이미 있다면,
        // 해당 배열에 현재 아이템의 날씨 정보를 추가
        if (mapDayWeather?.length) {
          mapDayWeather?.push(listInfoItem);
        }
      });
      // 가져온 모든 날씨 정보를 반환합니다.
      return fetchedWeather;
    },
  });

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
