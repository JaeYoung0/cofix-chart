import BasicLayout from '@/ui/layouts/BasicLayout'
import { css } from '@emotion/react'

function Home() {
  return (
    <BasicLayout>
      <div>
        <h1
          css={css`
            color: #fff;
          `}
        >
          Home
        </h1>
      </div>
    </BasicLayout>
  )
}

export default Home
