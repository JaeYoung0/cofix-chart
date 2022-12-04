import Calendar from '@/ui/components/Calendar/Calendar'
import BasicLayout from '@/ui/layouts/BasicLayout'
import { css } from '@emotion/react'

function Home() {
  return (
    <BasicLayout>
      <div
        css={css`
          max-width: 50rem;
          height: 100%;
        `}
      >
        <Calendar />
      </div>
    </BasicLayout>
  )
}

export default Home
