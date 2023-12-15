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
      // 이미 리스트에 있는 도시 이름이거나, 도시 이름이 cityNamePart를 포함하지 않는 경우 거르고,
      // 그렇지 않은 경우 도시 이름을 noRepeatCitiesNames에 추가하고, 필터링된 리스트에 포함
      noRepeatCitiesNames.includes(city.name) ||
      !city.name.toLowerCase().includes(cityNamePart.toLowerCase())
    ) {
      return false;
    }
    noRepeatCitiesNames.push(city.name);
    return true;
  });
  // 필터링된 도시 목록을 JSON 형식으로 반환
  return NextResponse.json(filteredCities);
}
