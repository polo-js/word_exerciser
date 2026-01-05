import next from '@next/eslint-plugin-next';

const prettier = require('eslint-config-prettier');
const path = require('path');

export default [
  {
    plugins: {
      '@next/next': next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
    },
  },
  // Добавляем Prettier конфигурацию
  prettier,
  {
    rules: {
      // Дополнительные правила, если нужно
      'prettier/prettier': [
        'warn',
        {
          // Указываем путь к конфигу Prettier на уровень выше
          prettierOptions: require(path.resolve(__dirname, '../.prettierrc')),
        },
      ],
    },
  },
];
