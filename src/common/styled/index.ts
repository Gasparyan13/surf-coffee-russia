import _styled, { CreateStyled } from '@emotion/styled'

type Styled = typeof _styled
type StyledComponent = Parameters<CreateStyled>[0]

const styled = ((
  component: StyledComponent,
  config: Parameters<CreateStyled>[1],
) => {
  config = {
    shouldForwardProp: (prop: string) => !prop.startsWith('$'),
    ...config,
  }
  return _styled(component, config)
}) as Styled

const styledTag = styled as unknown as Record<string, unknown>

'a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|main|map|mark|marquee|menu|menuitem|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr|circle|clipPath|defs|ellipse|foreignObject|g|image|line|linearGradient|mask|path|pattern|polygon|polyline|radialGradient|rect|stop|svg|text|tspan'
  .split('|')
  .forEach((tag) => {
    styledTag[tag] = styled(tag as StyledComponent)
  })

export default styledTag as unknown as Styled
