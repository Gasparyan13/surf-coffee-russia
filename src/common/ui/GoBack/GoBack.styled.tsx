import styled from '@common/styled'

export const Root = styled.div`
  width: 62px;
  cursor: pointer;
`

export const Icon = styled.div`
  display: flex;
`

export const Text = styled.div`
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${(props) => props.theme.colors.asphalt};
`
