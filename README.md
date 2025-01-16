# Космическая бургерная

### Описание
Многосраничный сайт для фаст-фуд магазина, позволяющий оформить заказ бургеров, выбрав ингридиенты по своему вкусу, разместить заказ, проверить историю заказов.

[Макет проекта](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)

### Особенности
- реализована сборка бургера; 
- оформление заказа и просмотр детальной информации об ингредиенте (всплывающее окно pop-up);
- просмотр ленты заказов с детализацией конкретного заказа;
- настроен защищённый роутинг;
- регистрация / авторизация;
- возможность сброса и восстановления пароля;
- редактирование данных пользователя в личном кабинете и просмотр истории заказов;
- сборка проекта выполнена сборщиком Webpack.

### Стек технологий:

![Static Badge](https://img.shields.io/badge/react-20232a?style=for-the-badge&logo=react)
![Static Badge](https://img.shields.io/badge/typescript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Static Badge](https://img.shields.io/badge/redux_toolkit-764abc?style=for-the-badge&logo=redux&logoColor=white)
![Static Badge](https://img.shields.io/badge/react_router-faf9f6?style=for-the-badge&logo=react%20router)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
  
### Установка и запуск
Клонируйте репозиторий и перейдите в его директорию:
```
git clone git@github.com:Awilova/blog-customizer.git
cd blog-customizer
```
Установите зависимости:
```
npm ci
```
Для сборки стабильной версии выполните команду:
```
npm run build
```
Для запуска проекта:
```
npm start
```
Приложение будет доступно по адресу: [http://localhost:4000](http://localhost:4000)


Для корректной работы запросов к серверу необходимо добавить переменную BURGER_API_URL в окружение. Сама ссылка находится в файле `.env.example`.
