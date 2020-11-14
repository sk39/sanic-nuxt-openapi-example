module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.[t|j]s?$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/scripts'
  ],
  setupFiles: ['./test_setup.js'],
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/utils/**/*.ts'
  ]
}
