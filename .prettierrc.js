module.exports = {
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 80,
  arrowParens: 'always',
  endOfLine: 'lf',
  bracketSpacing: true,
  useTabs: false,
  bracketSameLine: false,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './app/globals.css',

  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
        tabWidth: 2,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
    {
      files: '*.{css,scss}',
      options: {
        singleQuote: false,
        tabWidth: 2,
      },
    },
  ],
};
