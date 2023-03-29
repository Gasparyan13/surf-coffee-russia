export const TEST_ID_PROP_KEY = 'testid'

export const createTestId = (id?: string) =>
  id
    ? {
        [`data-${TEST_ID_PROP_KEY}`]: id,
      }
    : {}
