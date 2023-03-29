---
Конвенция по git flow
---

### Именование веток

*тип*/НАЗВАНИЕ_ПРОЕКТА-НОМЕР-ЗАДАЧИ

*Тип*:

- Новая функциональность

> feature/SURFIS-1111

- Баг

> bugfix/SURFIS-1111

- Рефакторинг

> refactoring/SURFIS-1111

## Последовательность действий после взятия задачи в работу:

1. Взять задачу/подзадачу из стори/баг в работу

2. Создать ветку из свежего develop согласно правилам именования
   > git checkout develop\
   > git pull\
   > git checkout -b feature/SURFIS-1111

3. Создать PR:
    1. подтянуть свежий develop в свою feature-ветку
    2. выполнить rebase над develop
    3. выполнить push
    4. отметить чекбокс удаления ветки после слияния
   > git checkout develop\
   > git pull\
   > git checkout feature/SURFIS-1111\
   > git rebase develop\
   > git push origin +feature/SURFIS-1111\

5. После получения минимального количества обязательных approve от обязательных ревьюверов, выполнить merge с применением рекомендуемой стратегии fast-forward.

6. Проверка безошибочной сборки в Jenkins

## Договоренности

1. Предпочтительно rebase вместо merge

2. Коммитов может быть несколько, стоит разделять коммиты по логическим завершенным блокам работы, например:
   > - добавлен новый компонент в uiKit\
   > - использование нового компонента на странице Персонал
   > - исправлены типы в компоненте Дровер

3. Оформление сообщения коммита
    1. Сообщение коммита должно обязательно включать заговок вида
   > {JIRA-ID} *{Цель изменений}*

   Цель изменений должна обязательно содержать глагол в инфинитиве, описывающий действие, а также объект действия

   Например:
   > SURFIS-1111 Add new variant button in uiKit

    2. Сообщение коммита должно по возможности содержать описание изменений в виде маркированного списка
   > - details
   > - more details
   > - crucial fix or enhancement
   > - why you made changes, what you've accomplished

## Рекомендации:

---

- Add a title
- Use Title case (i.e. \"Add Logging\" instead of \"add logging\")
- Add a body (optional)
- Explain WHAT the change is or WHY the change was needed
- Leave a blank line between the title and body
- Separate paragraphs in the body with blank lines
- Use a hyphen (-) for bullet points if needed

---

SURFIS-1111 Add new variant button in uiKit

- details
- more details
- crucial fix or enhancement
- why you made changes, what you've accomplished

---

## Договоренности по проведению PR-ов

1. После создания PR-а желательно в ближайшее время посмотреть его всем ревьюером, допустимое время ожидание - сутки

2. Если задача срочная/важная - необходимо уведомить тимлида и повысить приоритет просмотра PR

3. При добавления комментария в PR желательно создавать из комментария **"задачу"**, которую владелец изменений отмечает
   как выполненную после исправления

4. После того, как ревьюер оставил комментарий, ему следует запросить изменения, а после исправлений одобрить их
   выставлением отметки Approve

5. Для PR в состоянии WIP (Work In Progress) не нужно ни одобрять, ни запрашивать изменения. В противном случае,
   комментарии могут быть напрасны, т. к. работа над задачей еще не закончена.