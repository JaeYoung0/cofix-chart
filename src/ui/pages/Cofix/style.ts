import styled from '@emotion/styled'

export const Grid = styled.div`
  width: 100%;

  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;

  margin-left: auto;
  padding: 5rem 2rem;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
`

export const Item = styled.div`
  width: 100%;
  height: 100%;
  max-width: 70rem;

  margin: 0 auto;

  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 2rem;
`
