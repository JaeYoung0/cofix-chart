import React from 'react'
import CofixChart from '../../components/CofixChart'
import * as S from './HomeView.style'

function HomeView() {
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

export default HomeView
