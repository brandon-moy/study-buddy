module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/*/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/client/jest.setup.js']
};
