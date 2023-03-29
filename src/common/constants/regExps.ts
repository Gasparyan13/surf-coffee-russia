/* eslint-disable no-useless-escape */
export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{5,16}?[ \\-]*[0-9]{6,16}?$/
// BASE64 пароль
export const passwordRegExp =
  /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{4})$/
export const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const cyrillicRegExp = /[а-я ]/gi
export const englishRegExp = /[a-z ]/gi
export const innRegExp = /^[0-9]{10}$|^[0-9]{12}$/
export const amountRegexp =
  /(?=.*?\d)^\$?(([1-9]\d{0,2}(\s\d{3})*)|\d+)?(\.\d{1,2})?$/
export const firstLastNameRegExp = /^(?:[А-Я][а-яё -]+|[A-Z][a-z -]+){2,}$/
export const russianLettersRegExp = /^[\u0400-\u04FF ]+$/
export const englishLettersRegExp = /^[a-zA-Z\s]*$/
export const periodOfUseRegExp = /^(1[2-9]|2[0-9]|3[0-6])$/
export const checkForMultiLang = (mail?: string) => {
  if (!mail) return true
  mail = mail
    .replace(/\d+/g, '')
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
    .replace(englishRegExp, '1')
    .replace(cyrillicRegExp, '2')
  const isEnglish = mail.includes('1')
  const isCyrril = mail.includes('2')
  return !(isCyrril && isEnglish)
}
