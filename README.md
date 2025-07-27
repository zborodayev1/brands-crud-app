# Brand Management System

Современное веб-приложение для управления брендами, построенное на стеке MERN с полной поддержкой TypeScript.

> 🔗 [Frontend (Vercel)](https://brands-crud-app.vercel.app/)  
> 🔗 [Backend API (Render)](https://brands-crud-app.onrender.com/)  
> 🔗 [Swagger документация](https://brands-crud-app.onrender.com/api-docs)

## 🚀 Технологический стек

### Frontend

- **React 18** - Современная библиотека для создания пользовательских интерфейсов
- **TypeScript** - Типизированный JavaScript для лучшей разработки
- **Vite** - Быстрый инструмент сборки и dev-сервер
- **Tailwind CSS** - Utility-first CSS фреймворк

### Backend

- **Node.js** - JavaScript runtime для серверной части
- **Express.js** - Веб-фреймворк для Node.js
- **TypeScript** - Типизация для backend кода
- **MongoDB** - NoSQL база данных
- **Swagger** - Автоматическая документация API

### DevOps

- **Docker** - Контейнеризация приложения
- **Docker Compose** - Оркестрация контейнеров

## 📋 Предварительные требования

Убедитесь, что на вашей системе установлены:

- [Docker](https://docs.docker.com/get-docker/) (версия 20.0 или выше)
- [Docker Compose](https://docs.docker.com/compose/install/) (версия 1.27 или выше)
- [Git](https://git-scm.com/downloads)

## 🛠️ Локальная установка и запуск

### 1. Клонирование репозитория

```bash
git clone https://github.com/zborodayev1/brands-crud-app
cd brands-crud-app
```

### 2. Запуск приложения

Запустите всё приложение одной командой:

```bash
docker-compose up --build
```

Эта команда:

- Соберёт Docker образы для frontend и backend
- Запустит MongoDB контейнер
- Настроит все необходимые сетевые подключения
- Запустит приложение в development режиме

### 3. Проверка запуска

После успешного запуска вы увидите:

- Frontend доступен по адресу: http://localhost:5173/
- Backend API доступен по адресу: http://localhost:3000/
- Swagger документация: http://localhost:3000/api-docs/

## 🌐 Структура приложения

### Доступные страницы

| Страница        | URL                                    | Описание                            |
| --------------- | -------------------------------------- | ----------------------------------- |
| Главная         | http://localhost:5173/                 | Список всех брендов                 |
| Вход            | http://localhost:5173/sign-in          | Страница аутентификации             |
| Регистрация     | http://localhost:5173/sign-up          | Регистрация нового пользователя     |
| Бренд           | http://localhost:5173/brand/:id        | Детальная информация о бренде       |
| Создание бренда | http://localhost:5173/create-brand     | Форма создания нового бренда        |
| Редактирование  | http://localhost:5173/update-brand/:id | Редактирование существующего бренда |
| Админ-панель    | http://localhost:5173/admin            | Управление всеми брендами           |

### API Endpoints

Полная документация API доступна в Swagger UI: http://localhost:3000/api-docs/

Основные endpoints:

- `GET /api/brands` - Получить все бренды
- `POST /api/brands` - Создать новый бренд
- `GET /api/brands/:id` - Получить бренд по ID
- `PATCH /api/brands/:id` - Обновить бренд
- `DELETE /api/brands/:id` - Удалить бренд
- `POST /api/auth/login` - Авторизация
- `POST /api/auth/register` - Регистрация

## 🔧 Полезные команды

### Остановка приложения

```bash
docker-compose down
```

### Пересборка контейнеров

```bash
docker-compose up --build --force-recreate
```

### Просмотр логов

```bash
# Все сервисы
docker-compose logs

# Конкретный сервис
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongodb
```

### Очистка Docker ресурсов

```bash
# Удаление контейнеров
docker-compose down --volumes --remove-orphans

# Очистка неиспользуемых образов
docker system prune -a
```

## 📁 Структура проекта

```
brand-management-system/
├── frontend/                 # React frontend приложение
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
├── backend/                  # Express backend API
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── docker-compose.yml        # Docker Compose конфигурация
└── README.md
```

## 🐛 Решение проблем

### Порты заняты

Если порты 3000 или 5173 заняты, остановите соответствующие процессы:

```bash
# Найти процессы на портах
lsof -ti:3000
lsof -ti:5173

# Остановить процессы
kill $(lsof -ti:3000)
kill $(lsof -ti:5173)
```

### Проблемы с Docker

```bash
# Полная очистка Docker
docker system prune -a --volumes

# Удаление всех контейнеров проекта
docker-compose down --volumes --rmi all
```

### Проблемы с базой данных

```bash
# Пересоздание MongoDB контейнера
docker-compose down
docker volume rm $(docker volume ls -q)
docker-compose up --build
```

## 🔐 Переменные окружения

### Backend (.env)

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb+srv://clash976578:HLGwKd5PeEtyNHeI@brands-crud-app.dkczp5k.mongodb.net/brands-crud-app?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
```

## 📈 Development

### Разработка без Docker

Если вы хотите разрабатывать без Docker:

1. Установите MongoDB локально
2. Войдите в папку и установите Node.js:
   ```bash
   cd brands-crud-app
   npm install
   ```
3. Запустите frontend и backend:
   ```bash
   npm run dev
   npm run node
   ```

## 📄 Лицензия

Этот проект лицензирован под MIT License - смотрите файл [LICENSE](LICENSE) для деталей.
