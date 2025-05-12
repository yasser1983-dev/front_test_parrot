/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // O 'jsdom' si vas a testear componentes con React Testing Library
    testMatch: [
        '**/__tests__/**/*.test.ts',
        '**/__tests__/**/*.test.tsx',      // ✅ Añadir esta línea
        '**/?(*.)+(spec|test).ts',
        '**/?(*.)+(spec|test).tsx'         // ✅ Y esta también
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Si tienes alias de importación
    },
};