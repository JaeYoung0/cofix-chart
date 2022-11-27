import styled from '@emotion/styled'

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #000000;
  padding: 5rem 0;
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 60rem;

  margin: 0 auto;

  & + & {
    margin-top: 10rem;
  }
`
