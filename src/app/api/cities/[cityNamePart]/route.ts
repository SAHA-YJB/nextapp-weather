import citiesData from '@/data/cities.json';
import { NextResponse } from 'next/server';

//api만들기(서치 바에서 오는 요청)
export async function GET(
  request: Request,
  { params: { cityNamePart } }: { params: { cityNamePart: string } }
) {
  const noRepeatCitiesNames: string[] = [];
  const filteredCities = citiesData.filter((city) => {
    if (
      noRepeatCitiesNames.includes(city.name) ||
      !city.name.toLowerCase().includes(cityNamePart.toLowerCase())
    ) {
      return false;
    }
    noRepeatCitiesNames.push(city.name);
    return true;
  });
  return NextResponse.json(filteredCities);
}
