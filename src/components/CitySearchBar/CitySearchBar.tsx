'use client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CitySearchBar = () => {
  const [search, setSearch] = useState('');
  const [isShowingSearchResults, setIsShowingSearchResults] = useState(false);

  const cities = useQuery({
    queryKey: [search.toLowerCase()],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (!search) {
        setIsShowingSearchResults(false);
        return [];
      }
      try {
        const fetchedCities = await axios.get(`/api/cities/${search}`);

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
  }, [search]);

  return <div>CitySearchBar</div>;
};

export default CitySearchBar;
