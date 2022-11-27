import CofixChart from './CofixChart'
import * as S from './Home.style'

function Home() {
  return (
    <S.Container>
      <S.Wrapper>
        <CofixChart.New />
      </S.Wrapper>

      <S.Wrapper>
        <CofixChart.Short />
      </S.Wrapper>
    </S.Container>
  )
}

export default Home
