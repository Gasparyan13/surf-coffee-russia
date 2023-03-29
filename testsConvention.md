# Конвенция по unit-тестам

На проекте используется [jest](https://jestjs.io/docs/api) + [rtl](https://testing-library.com/docs/react-testing-library/api)

Запустить все тесты можно командой

```
yarn test
```

Запустить определенный тест можно командой

```
 yarn test src/.../component.test.tsx
```

### Характеристики хорошего модульного теста

- Быстрый. В хорошо разработанных проектах могут быть тысячи модульных тестов. Модульные тесты должны выполняться очень быстро. За миллисекунды.
- Изолированный. Модульные тесты являются автономными, могут выполняться изолированно и не имеют зависимостей от внешних факторов, таких как файловая система или база данных.
- Повторяемый. Запуски модульного теста должны иметь согласованные результаты, то есть всегда возвращать одинаковый результат, если вы не вносите никаких изменений между запусками.
- Самопроверяющий. Тест должен автоматически определять, пройден он или нет, без участия пользователя.
- Уместный. Время на написание модульного теста не должно значительно превышать время написания тестируемого кода. Если вам кажется, что тестирование кода занимает слишком много времени по сравнению с написанием кода, продумайте структуру, более подходящую для тестирования.

## Договоренности

### Общее

1. Файл с тестом лежит рядом с компонентом
2. Файл обязательно имеет дополнительное название test (Например, `Drawer.test.tsx`)
3. Написание unit-теста обязательно, если создается новая или редактируется существующая функциональность
4. Тесты проверяются в пайплайнах giltab-а
5. Тесты должны быть максимально приближены к поведению юзера и отражать сценарии, который юзер проходит на странице
6. Тестирование стилей(наличие селектора у тега, css стиля) не тестируем. Исключение:

- если это единственное что видно пользователю после совершения каких-либо действий(только стили меняются)
- если это важно для функциональности, например выделение текущего месяца в таблице Персонал -> График работы

### Наименование

1. `describe` метод Jest используется для содержания одного или нескольких связанных тестов. `describe` разбивает ваш набор тестов на компоненты. Каждый раз, когда вы начинаете писать новый набор тестов для функциональности, оборачивайте его в `describe` блок.
2. Корневой `describe` должен совпадать с названием компонента/страницей/хуком/утилитой, которую мы тестируем.

```
describe('<Drawer />', () => {
```

3. Вложенные `describes` должны иметь `when` префикс (для указания конкретных сценариев)

```
describe('when user does not exist', () => {
```

4. Используйте `test` или `it` для выполнения отдельных тестовых случаев.
5. Разные функциональные возможности должны тестироваться в разных блоках.
6. Необходимо описывать каждый тест одним предложением.
7. Обычно каждый блок начинается со слова `should`, чтобы описать, что должно произойти в блоке
8. Описание `it` -> должен что-то делать

```
it('should return guest user', () => {
```

9. Описание `test` -> должен что-то проверять

```
test('render correct content'
```

### События

Для моделирования события используем `@testing-library/user-event` библиотеку. В случае если рендер компонента является "тяжелым" (имеет сложную логику перерисовки или вызывает большое количество сайд-эффектов) следует использовать `fireEvent`.

```
// ❌
fireEvent.change(input, {target: {value: 'hello world'}})

// ✅
userEvent.type(input, 'hello world')
```

### [Best practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

Деструктурируйте то, что вам нужно из `render` или назовите это `view`(НЕ `wrapper`)

```
// ❌
const wrapper = render(<Example prop="1" />)
wrapper.rerender(<Example prop="2" />)

// ✅
const {rerender} = render(<Example prop="1" />)
rerender(<Example prop="2" />)
```

Используйте screen для запросов и отладки. _Не всегда применимо, особенно если нужен event или только одно обращение к screen_

```
// ❌
const {getByRole} = render(<Example />)
const errorMessageNode = getByRole('alert')

// ✅
render(<Example />)
const errorMessageNode = screen.getByRole('alert')
```

Пользоваться утверждениями из [@testing-library/jest-dom](https://github.com/testing-library/jest-dom#tobedisabled)\*\*

```
const button = screen.getByRole('button', {name: /disabled button/i})

// ❌
expect(button.disabled).toBe(true)
// error message:
//  expect(received).toBe(expected) // Object.is equality
//  Expected: true
//  Received: false

// ✅
expect(button).toBeDisabled()
// error message:
//   Received element is not disabled:
//     <button />
```

Использовать правильные запроса - [ПРИОРИТЕТЫ](https://testing-library.com/docs/queries/about/#priority)

```
// ❌
// assuming you've got this DOM to work with:
// <label>Username</label><input data-testid="username" />
screen.getByTestId('username')

// ✅
// change the DOM to be accessible by associating the label and setting the type
// <label for="username">Username</label><input id="username" type="text" />

screen.getByRole('textbox', {name: /username/i})
```

Не использовать `container` для запроса элементов

```
// ❌
const {container} = render(<Example />)
const button = container.querySelector('.btn-primary')
expect(button).toHaveTextContent(/click me/i)

// ✅
render(<Example />)
screen.getByRole('button', {name: /click me/i})
```

Запрашивать по тексту ([ПРИОРИТЕТЫ](https://testing-library.com/docs/queries/about/#priority))

```
// ❌
screen.getByTestId('submit-button')

// ✅
screen.getByRole('button', {name: /submit/i})
```

Использовать ​​ `*ByRole` для запроса элемента

```
// assuming we've got this DOM structure to work with
// <button><span>Hello</span> <span>World</span></button>
screen.getByText(/hello world/i)
// ❌ fails with the following error:

// Unable to find an element with the text: /hello world/i. This could be
// because the text is broken up by multiple elements. In this case, you can
// provide a function for your text matcher to make your matcher more flexible.

screen.getByRole('button', {name: /hello world/i})
// ✅ works!
```

Избегайте добавления ненужных или неправильных атрибутов доступности.

```
// ❌
render(<button role="button">Click me</button>)

// ✅
render(<button>Click me</button>)
```

Используйте `query*` варианты только для утверждения, что элемент не может быть найден.

```
// ❌
expect(screen.queryByRole('alert')).toBeInTheDocument()

// ✅
expect(screen.getByRole('alert')).toBeInTheDocument()
expect(screen.queryByRole('alert')).not.toBeInTheDocument()
```

Используйте `find*` в любое время, когда вы хотите запросить что-то, что может быть недоступно прямо сейчас.

```
// ❌
const submitButton = await waitFor(() =>
 screen.getByRole('button', {name: /submit/i}),
)

// ✅
const submitButton = await screen.findByRole('button', {name: /submit/i})
```

Помещайте только одно утверждение в колбек.

```
// ❌
await waitFor(() => {
 expect(window.fetch).toHaveBeenCalledWith('foo')
 expect(window.fetch).toHaveBeenCalledTimes(1)
})

// ✅
await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('foo'))
expect(window.fetch).toHaveBeenCalledTimes(1)
```

Поместите побочные эффекты вне `waitFor` обратных вызовов и зарезервируйте обратный вызов только для утверждений.

```
// ❌
await waitFor(() => {
 fireEvent.keyDown(input, {key: 'ArrowDown'})
 expect(screen.getAllByRole('listitem')).toHaveLength(3)
})

// ✅
fireEvent.keyDown(input, {key: 'ArrowDown'})
await waitFor(() => {
 expect(screen.getAllByRole('listitem')).toHaveLength(3)
})
```

Если вы хотите утверждать, что что-то существует, сделайте это утверждение явным.

```
// ❌
screen.getByRole('alert', {name: /error/i})

// ✅
expect(screen.getByRole('alert', {name: /error/i})).toBeInTheDocument()
```
