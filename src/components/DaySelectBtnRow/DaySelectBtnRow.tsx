import { WeatherListElement } from '@/models/weatherRequest';
import React from 'react';
import DaySelectBtn from '../DaySelectBtn/DaySelectBtn';

interface DaySelectBtnRowProps {
  dayShowing: number;
  sixDaysInfo: Map<string, WeatherListElement[]>;
  setDayShowing: (day: number) => void;
}

const DaySelectBtnRow = ({
  dayShowing,
  sixDaysInfo,
  setDayShowing,
}: DaySelectBtnRowProps) => {
  return (
    <div>
      {[...sixDaysInfo.keys()].map((key, index) => {
        const mapDayWeather = sixDaysInfo.get(key);
        if (mapDayWeather) {
          return (
            <DaySelectBtn
              key={key}
              isSelected={dayShowing === index}
              onClick={() => setDayShowing(index)}
              date={mapDayWeather[0].dt_txt.split(' ')[0].slice(5) ?? ''}
              text={''}
            />
          );
        }
      })}
    </div>
  );
};

export default DaySelectBtnRow;
