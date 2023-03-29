process.env.TZ = 'UTC'

module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/testEnv/config/jest.setup.ts'],
  setupFiles: ['jest-localstorage-mock'],
  globals: {
    $BACK_DOMAIN$: 'test',
    $ENV_MODE$: 'test',
  },
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$':
      '<rootDir>/src/testEnv/config/mock/emptyObject.ts',
    '\\.(gif|ttf|eot|svg|png)$':
      '<rootDir>/src/testEnv/config/mock/emptyObject.ts',
    '^@src(.*)$': '<rootDir>/src$1',
    '^@app(.*)$': '<rootDir>/src/app$1',
    '^@components(.*)$': '<rootDir>/src/common/components$1',
    '^@helpers(.*)$': '<rootDir>/src/common/helpers$1',
    '^@hooks(.*)$': '<rootDir>/src/common/hooks$1',
    '^@providers(.*)$': '<rootDir>/src/common/providers$1',
    '^@types(.*)$': '<rootDir>/src/common/types$1',
    '^@uiKit(.*)$': '<rootDir>/src/common/uiKit$1',
    '^@common(.*)$': '<rootDir>/src/common$1',
    '^@ui(.*)$': '<rootDir>/src/common/ui$1',
    '^@store(.*)$': '<rootDir>/src/store$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@rtkApi(.*)$': '<rootDir>/src/services/rtkApi$1',
    '^@testEnv(.*)$': '<rootDir>/src/testEnv$1',
    '^@constants(.*)$': '<rootDir>/src/common/constants$1',
    '^@utils(.*)$': '<rootDir>/src/common/utils$1',
  },
  maxWorkers: 3,
  maxConcurrency: 3,
  workerIdleMemoryLimit: 0.2,
}
