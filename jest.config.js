/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  testMatch: ['<rootDir>/**/**/__tests__/**/*test.ts'],
  coverageDirectory: 'dist/test-coverage',
  coverageReporters: ['html', 'text'],
  collectCoverageFrom: [
    '<rootDir>/**/**/main/**/*.ts',
  ],
  rootDir: __dirname
};