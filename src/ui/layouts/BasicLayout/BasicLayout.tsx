import React, { PropsWithChildren } from 'react'
import * as S from './style'
import Link from 'next/link'

const BasicLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <S.Layout>
      <S.SideNavigation>
        <Link href="/">
          <S.MenuItem>Home</S.MenuItem>
        </Link>
        <Link href="/cofix">
          <S.MenuItem>Cofix</S.MenuItem>
        </Link>
      </S.SideNavigation>
      <S.Main>{children}</S.Main>
    </S.Layout>
  )
}

export default BasicLayout
