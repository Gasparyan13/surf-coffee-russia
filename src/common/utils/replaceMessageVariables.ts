type Variables = {
  [k: string]: string | number
}

export const replaceMessageVariables = (
  message: string,
  variables: Variables,
) =>
  Object.keys(variables).reduce(
    (acc, key) => acc.replace(`{{${key}}}`, `${variables[key]}`),
    message,
  )
