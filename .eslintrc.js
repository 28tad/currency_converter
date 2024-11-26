// .eslintrc.js

module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'airbnb',
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json', // Укажите путь к вашему tsconfig.json
      tsconfigRootDir: __dirname,
      ecmaVersion: 13,
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
      'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
          js: 'never',
          jsx: 'never',
        },
      ],
      'react/react-in-jsx-scope': 'off', // Если используете новую версию React
      'react/function-component-definition': 'off',
      'react/prop-types': 'off', // Если не используете PropTypes
      '@typescript-eslint/no-unused-vars': ['warn'],
      'import/prefer-default-export': 'off',
      'no-plusplus': 'off',
      'no-param-reassign': 'off',
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  };
  