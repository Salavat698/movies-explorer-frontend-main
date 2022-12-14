export const beatfilmApiURL = "https://api.nomoreparties.co";
export const mainApiURL = "https://slt116.nomoredomains.club";

export const errors = {
  minPassLength: "Длина пароля должна быть более восьми символов.",
  isValidEmail: "Введен некорректный имейл.",
  minNameLength: "Длина имени не может быт короче двух символов.",
  required: "Поле не должно быть пустым.",
  serverResponseErr:
    "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
  loginFail: "Не удалось авторизоваться, прпробуйте еще раз.",
  emailBusy: "Пользователь с таким имейлом уже зарегистрирован.",
  formatError:
    "В имени допускается символы латиницы, кириллицы, пробел и тире.",
  badValue: "Переданы некорректные данные.",
  sameData: "Вы ввели данные которые уже используются.",
  badPass: "Вы используете недопутимые символы для пароля.",
};

export const passRegexpEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passRegexp = /^\S+$/;
export const regexp = /^[а-яА-ЯёЁa-zA-Z \-]+$/;
export const registrationSucceed = "Вы зарегистрировались.";
export const userDataChanged = "Новые данные сохранены.";
export const shorts = "Короткометражки";
export const name = "Имя";
export const greeting = "Добро пожаловать!";
export const email = "E-mail";
export const password = "Пароль";
export const registerAsk = "Уже зарегистрированы?";
