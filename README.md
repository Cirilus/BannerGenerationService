# BannerGenerationService

#  Решение использует submodules, смотрите ветки

## Описание
**BannerGenerationService** — передовой сервис для банков, который позволяет генерировать персонализированные маркетинговые предложения в виде изображений, оптимизируя коммуникацию с клиентами с помощью машинного обучения.

## Функциональные возможности
- **Автоматическая генерация изображений**: Создание изображений различных форматов и размеров на основе данных клиентов.
- **Персонализированный маркетинговый текст**: Генерация текста с использованием модели Llama3, учитывая особенности клиента.
- **Простота редактирования**: Автоматическая вставка текста с возможностью его редактирования.
- **История генерации**: Отслеживание и разметка истории созданных баннеров.

## Требования
- **Языки**: Python, JavaScript (React.js)
- **СУБД**: PostgreSQL
- **Инструменты**: Docker

## Установка и запуск
1. Клонируйте репозиторий:
    ```bash
    git clone https://github.com/Cirilus/BannerGenerationService.git
    ```
2. Установите и обновите подмодули:
    ```bash
    make up install-submodules
    make up update-submodules
    ```
3. Создать файл .env в .docker
    3.1. Скопировать данные из .docker/.env.example в .docker/.env
    3.2. Заполнить данные в .docker/.env
4. Создать файл .env в backend/configs/
5.     4.1. Скопировать данные из backend/configs/.env.example в backend/configs/.env
6.     4.2. Заполнить данные в backend/configs/.env
7.  Зайти в backend запустить команду `
   ```bash
    make download_models
   ```
7. Зайти в image-generation запустить команду
   ```bash
    make download_models
   ```
9. Соберите и запустите контейнеры:
    ```bash
    docker-compose up --build
    ```

## Использование
### Веб-интерфейс
#### Авторизация
- Войдите в систему с использованием вашего логина и пароля. Сервис использует JWT для обеспечения безопасности доступа.

#### Генерация баннеров
1. **Шаг 1**: Заполните данные о клиенте, включая пол, возраст и другие социально-демографические показатели.
2. **Шаг 2**: Укажите параметры продукта и канала коммуникации.
3. **Шаг 3**: Выберите размеры изображения.
4. **Шаг 4**: Нажмите кнопку "Сгенерировать", чтобы получить персонализированные изображения и текстовые предложения.
5. **Шаг 5**: Просмотрите сгенерированные баннеры и отредактируйте текст по необходимости.

#### История генерации
- Перейдите в раздел истории генерации, чтобы просмотреть ранее созданные баннеры

#### Кастомные настройки
- Настройте параметры под ваши предпочтения для улучшения персонализации предложений.

## Структура проекта
### Компоненты
1. **API Приложение**:
    - Контейнер: FastAPI
    - Реализует все API для сервиса, обеспечивая взаимодействие с моделями и базой данных.
2. **База данных**:
    - Контейнер: PostgreSQL
    - Хранение данных клиентов и истории запросов, обеспечивая надежное и быстрое взаимодействие с данными.
3. **S3 Хранилище**:
    - Контейнер: Minio
    - Безопасное хранение сгенерированных изображений, доступное для последующего использования.
4. **LLM Сервис**:
    - Контейнер: Python, llamacpp
    - Мощная генерация маркетинговых текстов, обеспечивая персонализацию предложений.
5. **Сервис генерации изображений**:
    - Контейнер: Python, diffusers
    - Высококачественная генерация изображений, соответствующих требованиям клиентов и корпоративному стилю.

### Веб-интерфейс
- **Контейнер: React**
- Интуитивно понятный интерфейс для пользователей, предоставляющий доступ ко всем функциям сервиса.
- Просмотр истории генерации баннеров и разметка их успешности.
- Авторизация через JWT, обеспечивающая безопасность доступа.
- Кастомные настройки под каждого пользователя для максимальной персонализации.

## Основные возможности и преимущества
1. **Инновационная генерация контента**: Использование передовых моделей для создания маркетингового текста и изображений.
2. **Полная кастомизация**: Настройки под каждого пользователя для предоставления наиболее релевантных предложений.
3. **Эффективность и скорость**: Быстрая генерация контента, не превышающая 5 секунд на запрос.
4. **Безопасность и надежность**: Авторизация через JWT и использование PostgreSQL для хранения данных.
5. **История и анализ**: Ведение истории генерации и возможность разметки для последующего анализа и улучшения модели.

## Тестирование
1. Запуск unit и контрактных тестов:
    ```bash
    pytest
    ```

## Контакты и авторы
- **Пискленов Тимофей** - [ML/AI](https://t.me/Pocket_brain)
- **Школенко Кирилл** - [Backend](https://t.me/kirusha23)
- **Шатохин Максим** - [Frontend & PM](https://t.me/WWLaunch)
- **Чесников Леонид** - [ML/AI](https://t.me/RebelRaider)
- **Мелихова Диана** - [Design](https://t.me/dinaubergine)
