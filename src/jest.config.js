/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node', // O 'jsdom' si vas a testear componentes con React Testing Library
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Si tienes alias de importación
    },
};