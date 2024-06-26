Это REST API для управления списком задач (to-do list). Оно позволяет выполнять CRUD-операции (создание, чтение, обновление и удаление) с задачами. API разработано с использованием стека технологий PostgreSQL, Prisma ORM, Express.JS, Docker и реализует авторизацию пользователей с помощью JWT.

Возможности
Регистрация и авторизация пользователей с помощью JWT
CRUD-операции для задач (только для авторизованных пользователей)
База данных PostgreSQL с использованием Prisma ORM
Поддержка Docker для простого развертывания

Доступные эндпоинты

Эндпоинты для пользователей
POST /auth/register: Регистрация нового пользователя
POST /auth/login: Авторизация пользователя и выдача JWT токена

Эндпоинты для задач (доступны только авторизованным пользователям)
POST /tasks: Создание новой задачи
GET /tasks: Получение списка всех задач текущего пользователя
GET /tasks/:id: Получение информации о конкретной задаче текущего пользователя
PUT /tasks/:id: Обновление информации о задаче текущего пользователя
DELETE /tasks/:id: Удаление задачи текущего пользователя

Таблицы базы данных

Пользователи
id: автоинкремент, первичный ключ
email: уникальный, текст
password: текст (хэшированный)

Задачи
id: автоинкремент, первичный ключ
title: текст
description: текст
status: boolean (по умолчанию false)
created_at и updated_at: таймстемпы
user_id: внешний ключ на таблицу пользователей

Инструкция по запуску
Клонировать репозиторий с вашим решением.
Запустить docker-compose up для запуска приложения и базы данных.
Проверить работу API через Postman или любой другой инструмент для тестирования REST API.

Валидация
Валидация данных реализована на уровне API.

Документация
Этот файл README.md служит документацией для API.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

To-Do List REST API
This is a REST API for managing a to-do list. It allows you to perform CRUD operations (create, read, update, and delete) on tasks. The API is built using PostgreSQL, Prisma ORM, Express.js, Docker, and features user authentication using JWT.

Features
User registration and login with JWT authentication
CRUD operations for tasks (only for authenticated users)
PostgreSQL database with Prisma ORM
Docker support for easy deployment

API Endpoints

User Endpoints
POST /auth/register: Register a new user
POST /auth/login: Log in a user and get a JWT token

Task Endpoints (requires authentication)
POST /tasks: Create a new task
GET /tasks: Get a list of all tasks of the current user
GET /tasks/:id: Get details of a specific task of the current user
PUT /tasks/:id: Update the details of a task of the current user
DELETE /tasks/:id: Delete a task of the current user

Database Tables

Users
id: auto-increment, primary key
email: unique, text
password: text (hashed)

Tasks
id: auto-increment, primary key
title: text
description: text
status: boolean (default: false)
created_at: timestamp
updated_at: timestamp
user_id: foreign key referencing the users table

Getting Started
Clone this repository
Run docker-compose up to start the application and the database
Test the API using Postman or any other REST API testing tool

Validation
Data validation is implemented at the API level.

Documentation
This README.md file serves as the documentation for the API.
