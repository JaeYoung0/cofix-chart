import React from 'react'
import CofixChart from '../../components/CofixChart'
import * as S from './HomeView.style'

function HomeView() {
  return (
    <S.Layout>
      <S.SideNavigation>
        <S.MenuItem>A</S.MenuItem>
        <S.MenuItem>A</S.MenuItem>
        <S.MenuItem>A</S.MenuItem>
      </S.SideNavigation>
      <S.Grid>
        <S.Item>
          <CofixChart.New />
        </S.Item>

        <S.Item>
          <CofixChart.New />
        </S.Item>

        <S.Item>
          <CofixChart.New />
        </S.Item>

        <S.Item>
          <CofixChart.Short />
        </S.Item>

        <S.Item>
          <CofixChart.Short />
        </S.Item>

        <S.Item>
          <CofixChart.Short />
        </S.Item>
      </S.Grid>
    </S.Layout>
  )
}

export default HomeView
