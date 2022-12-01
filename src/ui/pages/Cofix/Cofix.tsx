import CofixChart from '@/ui/components/CofixChart'
import BasicLayout from '@/ui/layouts/BasicLayout'
import React from 'react'

import * as S from './style'

function Cofix() {
  return (
    <BasicLayout>
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
    </BasicLayout>
  )
}

export default Cofix
