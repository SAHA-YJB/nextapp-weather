# NEXT

## Next.js / TypeScript / TanStack/React-Query / Zustand / Tailwind CSS

### API 요청 링크 함수 정의

서버에서 날씨 데이터를 가져오기 위한 엔드포인트를 정의하는 함수

### 디바운스 커스텀 훅 정의

이 커스텀 훅은 함수가 발동하는 빈도를 제한하는 유틸리티 함수
사용자가 타이핑을 멈춘 후 API 요청을 보내 불필요한 요청 제어

### 도시 요청 함수 정의 (TanStack React Query / Axios 사용)

이 함수는 서버에서 도시 목록 데이터를 가져오고, 캐싱 및 업데이트하는데  
React Query를 사용하고, HTTP 요청을 보내는데 Axios를 사용

### 도시 응답 API 정의 (GET 요청, 파라미터 추출)

이 API 엔드포인트는 도시 이름을 파라미터로 하는 GET 요청을 받아 일치하는 도시 데이터를 반환

### Zustand 상태 관리 스토어 생성

애플리케이션의 전역 상태를 관리

### 날짜 데이터 요청 함수 정의

이 함수는 서버에서 특정 날짜의 날씨 데이터를 가져와 날짜별로 그룹화하여 출력
