module.exports = {
  testMatch: ['**/?(*.)+(spec|test).ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['packages/**/src/**/*.{js,jsx,mjs,ts,tsx}', '!(packages/**/typings)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  roots: ['<rootDir>/src'],
};
