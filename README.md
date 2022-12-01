# Cofix-chart

## COFIX 공시등을 chart로 보여주는 웹

1. cheerio로 [은행연합회 사이트](https://portal.kfb.or.kr/fingoods/cofix.php?BasicYear=2022&BasicYear_W=2022)의 데이터를 긁어서 api를 만들어준다. [O]
2. 데이터를 chart.js로 시각화한다.[O]
   - [시각화 예시](https://react-chartjs-2.js.org/examples)
3. react-query로 중복 호출을 제거한다. [O]
4. react-query + SSG [O]
5. calendar 컴포넌트 + 연도별 차트 조회하기. 연도별로 getStaticPaths? [ ]
6. 조금 더 다양한 데이터 긁어오기 ex. 기준금리 코스피 코스닥 환율 부동산가격지수 CPI PPI

## 참고

- https://dev.to/mtliendo/create-a-public-api-by-web-scraping-in-nextjs-2f5n
- https://www.zenrows.com/blog/web-scraping-cheerio#write-the-code
