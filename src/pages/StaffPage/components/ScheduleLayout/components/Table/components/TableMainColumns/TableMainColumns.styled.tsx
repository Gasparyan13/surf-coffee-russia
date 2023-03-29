import styled from '@common/styled'

export const MainList = styled.ul<{ $rowCount: number; $columnCount: number }>`
  display: grid;
  grid-template-rows: repeat(${(props) => props.$rowCount}, 1fr);
  grid-template-columns: repeat(${(props) => props.$columnCount}, 1fr);
  list-style: none;
  padding: 0;
  margin: 0;
`

export const MainItem = styled.li`
  display: flex;
`
