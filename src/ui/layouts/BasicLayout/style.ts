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
  min-width: 10rem;
  height: auto;
  padding: 5rem 0;

  // Link
  a + a {
    margin-top: 5rem;
  }
`

export const Main = styled.main`
  width: 100%;
`

export const MenuItem = styled.button`
  width: 5rem;
  height: 5rem;
  border: 1px solid #000;
`
