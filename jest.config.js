module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.test.js'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    }
};
