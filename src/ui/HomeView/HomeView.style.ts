import styled from '@emotion/styled'

export const Layout = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: #000000;
`

export const SideNavigation = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background: rgba(255, 255, 255, 0.5);
  width: 10rem;
  height: auto;
  padding: 5rem 0;
`

export const MenuItem = styled.button`
  width: 5rem;
  height: 5rem;
  border: 1px solid #000;

  & + & {
    margin-top: 5rem;
  }
`

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
