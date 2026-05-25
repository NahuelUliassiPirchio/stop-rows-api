import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.test.js'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json'
        }
    }
};

export default config;
