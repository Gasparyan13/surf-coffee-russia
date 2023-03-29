# Frontend project SURFIS

Проект написан на [React.js v18](https://reactjs.org/) и [Typescript](https://www.typescriptlang.org/)

Для стейт менежмента и получения данных используется [redux-toolkit](https://redux-toolkit.js.org/) и [rtk-query](https://redux-toolkit.js.org/rtk-query/overview)

Роутинг организован с помощью [react-router v6](https://reactrouter.com/en/main)

Тесты пишем используя [Jest](https://jestjs.io/) и [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

Для написания стилей - CSS-in-JS библиотека [emotion](https://emotion.sh/docs/introduction)

Готовые стилизованные компоненты берем из [material-ui](https://mui.com/)

Формы создаем с помощью [react-hook-form](https://react-hook-form.com/)

Для работы с датой используем [date-fns](https://date-fns.org/)

За кодом следит [eslint](https://eslint.org/) и [prettier](https://prettier.io/)

## Конвенции

Принятая [git конвенция](gitConvention.md)

Принятая [конвенция для написания тестов](testsConvention.md)

[Чек лист](https://docs.google.com/document/d/1JiC_pHgNmF6xG6QopPoS6_JG24URmBkbErIdiamoEBM/edit?usp=sharing) для тестирования своей работы

## Для работы с проектом

Установить npm пакеты
``` 
yarn install 
// или 
yarn 
```

Выполнить команду 

```
yarn start
```

Проект запуститься на [localhost:3000](http://localhost:3000/)

## Для работы со storybook

Установить npm пакеты
``` 
yarn install 
// или 
yarn 
```

Выполнить команду 

```
yarn storybook
```

Проект запуститься на [localhost:6006](http://localhost:6006/)

## Работа с данными

Все контроллеры описаны [тут](src/services/rtkApi/core/constants.ts)

Если появляется новый контроллер, его необходимо добавить в группу контроллеров в переменную ```CONTROLLER_GROUPS```

Для того чтобы сгенерировать новые роуты(хуки) для работы с данными необходимо запустить команду
```
yarn rtk
```
Новые эндпоинты появятся в директории ```src/services/rtkApi/modules/__generated__)```

## Для запуска тестов

Запустить все тесты проекта

```
yarn test
```


Запустить тесты отдельного компонента
```
yarn test src/путь_до_компонент.test.tsx
```

## Typescript

Для проверки на наличие ошибок typescript-а запустить команду
```
yarn type-check
// или
yarn type-check:watch
```

## Prettier
Для проверки на наличие ошибок prettier-а запустить команду
```
yarn prettier
```
Для исправления ошибок prettier-а запустить команду
```
yarn prettier:fix
```

## Eslint
Для проверки на наличие ошибок eslint-а запустить команду
```
yarn lint
```
Для исправления ошибок eslint-а запустить команду
```
yarn lint:fix
```

Также можно запустить исправления ошибок prettier-а и eslint-а одной командой
```
yarn format
```





