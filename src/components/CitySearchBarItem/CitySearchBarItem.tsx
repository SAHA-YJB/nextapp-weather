import { WeatherDbData } from '@/models/weatherDbData';
import { useChosenCity } from '@/store/useChosenCity';
import React from 'react';

interface CitySearchBarItemProps {
  city?: WeatherDbData;
  onClick: () => void;
  noResultText?: string;
}

const CitySearchBarItem = ({
  city,
  onClick,
  noResultText,
}: CitySearchBarItemProps) => {
  const { setChosenCity } = useChosenCity();
  return (
    <div
      onClick={() => {
        if (city) {
          setChosenCity(city);
        }
        onClick();
      }}
      className={`
      searchBarResult px-3 py-2 border-b-2 rounded-[10px] 
      transition-colors duration-200 text-black bg-white 
      hover:text-white hover:bg-[var(--sky-color)]`}
    >
      <div
        className={`searchBarResult__container gap-3 flex justify-start relative`}
      >
        {noResultText ? (
          <span className={`searchBarResult__noResultText`}>
            {noResultText}
          </span>
        ) : (
          ''
        )}
        {city ? (
          city.name.length <= 28 ? (
            <span>{city.name}</span>
          ) : (
            <span className={`searchBarResult__cityName`}>
              {city.name.slice(0, 28)}...
            </span>
          )
        ) : (
          ''
        )}
        <span
          className={`searchBarResult__country absolute top-[0px] right-0 opacity-40 font-bold`}
        >
          {city ? city.country : ''}
        </span>
      </div>
    </div>
  );
};

export default CitySearchBarItem;
