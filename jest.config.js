module.exports={
    preset: 'ts-jest',
    setupFiles: [
        'dotenv/config',
        '<rootDir>/setJestEnvVars.js'
    ],
    verbose: true,
    forceExit: true,
    coverageThreshold: {
        global: {
            statements: 60,
            branches: 60,
            functions: 60,
            lines: 60,
        },
    },
    collectCoverageFrom: [
        `<rootDir>/src/app/**/*.ts`,
    ],
    testMatch: [
        `<rootDir>/tests/src/app/**/*.ts`,
        //`<rootDir>/tests/src/app/onboarding/**/*.ts`,
        //`<rootDir>/tests/src/core/**/*.ts`
    ]
};