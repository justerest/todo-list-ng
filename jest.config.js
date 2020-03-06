module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', '.'],
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.[jt]sx?$',
};
