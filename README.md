# Cofix-chart
## COFIX 공시를 chart로 보여주는 웹
1. cheerio로 https://portal.kfb.or.kr/fingoods/cofix.php?BasicYear=2022&BasicYear_W=2022 같은 사이트의 데이터를 긁어온다. [ ]
2. 이를 api routes에서 response로 내려준다. [ ]
3. 브라우저에서는 chart.js로 시각화한다.