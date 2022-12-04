import styled from '@emotion/styled'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1.6rem;
  color: #fff;
`

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.5em 0;

  svg {
    width: 1.2em;
    height: 1.2em;
    fill: #fff;
    cursor: pointer;
  }

  svg.left {
    transform: rotate(180deg);
  }
`

export const DaysWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  padding: 1.5em 0;
`

export const Day = styled.div`
  width: 100%;
  text-align: center;
`

export const DatesWrapper = styled.div``

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const Cell = styled.div`
  width: 100%;
  height: 5rem;
  text-align: center;

  &.disabled {
    color: gray;
  }

  &.selected {
    color: #2959ff;
  }
`
