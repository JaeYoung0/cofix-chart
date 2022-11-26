import * as S from './Home.style'
import { css } from '@emotion/react'
import useCofix from './useCofix'

function Home() {
  const { rows } = useCofix()
  console.log('@@rows', rows)

  return (
    <S.Container>
      Home
      <h1
        css={css`
          color: white;
        `}
      >
        Home
      </h1>
    </S.Container>
  )
}

export default Home
