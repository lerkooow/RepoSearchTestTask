# GitHub Repository Search App

Приложение для поиска репозиториев GitHub с возможностью просмотра деталей и issues.

## Технологии

- **React 18** с TypeScript
- **Vite** для сборки
- **Redux Toolkit** для управления состоянием
- **RTK Query** для работы с API
- **Material-UI** для компонентов интерфейса
- **SCSS** для стилизации

## Установка и запуск

1. Установите зависимости:

```bash
npm install
```

2. (Опционально) Создайте файл `.env` и добавьте GitHub токен для увеличения лимитов API:

```bash
cp .env.example .env
# Отредактируйте .env и добавьте ваш токен
```

3. Запустите приложение в режиме разработки:

```bash
npm run dev
```

4. Откройте [http://localhost:5173](http://localhost:5173) в браузере.

## Структура проекта

```
src/
├── components/
│   ├── MainPanel/         # Основная панель с результатами поиска
│   ├── SearchPanel/       # Панель поиска
│   ├── RepositoryPanel/   # Панель с деталями репозитория
│   └── Table/            # Компонент таблицы с результатами
├── services/
│   ├── githubApiSlice.ts  # API для работы с issues
│   └── githubReposApi.ts  # API для поиска репозиториев
├── types.tsx             # Типы TypeScript
├── store.ts              # Настройка Redux store
└── data.ts              # Конфигурация колонок таблицы
```

## Возможности

- 🔍 Поиск репозиториев по GitHub API
- 📊 Сортировка результатов по различным критериям
- 📄 Пагинация результатов
- 📋 Просмотр деталей репозитория
- 🎨 Адаптивный дизайн

## GitHub API

Приложение использует GitHub REST API v4. Для увеличения лимитов запросов рекомендуется:

1. Создать Personal Access Token в [GitHub Settings](https://github.com/settings/tokens)
2. Добавить токен в файл `.env` как `VITE_GITHUB_TOKEN`

Без токена доступно 60 запросов в час, с токеном - 5000 запросов в час.

## Скрипты

- `npm run dev` - запуск в режиме разработки
- `npm run build` - сборка для продакшена
- `npm run preview` - предварительный просмотр собранного приложения
- `npm run lint` - проверка кода с ESLint

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
