'use client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import CitySearchBarItem from '../CitySearchBarItem/CitySearchBarItem';
import { WeatherDbData } from '@/models/weatherDbData';
import { useDebounce } from '@/hooks/useDebounce';

const CitySearchBar = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);
  const [isShowingSearchResults, setIsShowingSearchResults] = useState(false);

  //요청을 보내는 함수
  const cities = useQuery({
    queryKey: [debouncedSearch.toLowerCase()],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (!debouncedSearch) {
        setIsShowingSearchResults(false);
        return [];
      }
      try {
        const fetchedCities = await axios.get<WeatherDbData[]>(
          `/api/cities/${debouncedSearch}`
        );

        if (fetchedCities.status !== 200) {
          console.error(fetchedCities);
          return [];
        }

        setIsShowingSearchResults(true);

        return fetchedCities.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    cities.refetch();
  }, [debouncedSearch]);

  return (
    <div className='searchBar'>
      <div
        className={`searchBar__bar flex justify-between max-w-[300px] border-2 relative`}
      >
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={cities.isLoading ? '로딩 중...' : '도시를 검색하세요!'}
          className='searchBar__input w-full h-[48px] text-[1rem] px-3 py-2'
        />
        <div className='searchBar__LoadingSpinner absolute top-0 right-0 w-[48px] h-[48px] grid content-center'>
          {cities.isLoading || cities.isFetching ? (
            <LoadingSpinner width='w-[38px]' height='h-[38px]' />
          ) : null}
        </div>
      </div>
      {isShowingSearchResults ? (
        <div
          className={`searchBar__results absolute z-[2] flex flex-col gap-2 border-2 border-gray-500 my-1 rounded-[10px] p-2 w-[300px] bg-white`}
        >
          {cities.data && cities.data.length !== 0 ? (
            cities.data.slice(0, 6).map((city) => (
              <CitySearchBarItem
                key={city.id}
                city={city}
                onClick={() => {
                  setIsShowingSearchResults(false);
                  setSearch('');
                }}
              />
            ))
          ) : (
            <CitySearchBarItem
              noResultText='검색 결과가 없습니다.'
              onClick={() => {
                setIsShowingSearchResults(false);
                setSearch('');
              }}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default CitySearchBar;
