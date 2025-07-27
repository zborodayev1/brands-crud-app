/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: CRUD для брендов
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           example: "64a2f2a9bcba6c7d95a0d123"
 *         name:
 *           type: string
 *           example: "Nike"
 *         description:
 *           type: string
 *           example: "American sportswear company"
 *         logoUrl:
 *           type: string
 *           example: "https://example.com/logo.png"
 *         createdAt:
 *           type: string
 *           format: date
 *           example: "2024-06-01"
 *         updatedAt:
 *           type: string
 *           format: date
 *           example: "2024-06-10"
 */

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Создание нового бренда
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Adidas"
 *               description:
 *                 type: string
 *                 example: "Немецкий бренд спортивной одежды"
 *               logoUrl:
 *                 type: string
 *                 example: "https://example.com/adidas.svg"
 *     responses:
 *       201:
 *         description: Успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brand:
 *                   $ref: '#/components/schemas/Brand'
 *                 message:
 *                   type: string
 *                   example: Brand created successfully!
 *       400:
 *         description: Ошибка валидации или бренд уже существует
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Получить список брендов с пагинацией и поиском
 *     tags: [Brands]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Количество на странице
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: createdAt
 *         description: Поле для сортировки
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Направление сортировки
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Поиск по названию
 *     responses:
 *       200:
 *         description: Список брендов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Brand'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Получить бренд по ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID бренда
 *     responses:
 *       200:
 *         description: Найденный бренд
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brand:
 *                   $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Бренд не найден
 */

/**
 * @swagger
 * /brands/{id}:
 *   patch:
 *     summary: Обновить данные бренда
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID бренда
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Reebok"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               logoUrl:
 *                 type: string
 *                 example: "https://example.com/reebok.svg"
 *     responses:
 *       200:
 *         description: Успешное обновление
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brand:
 *                   $ref: '#/components/schemas/Brand'
 *                 message:
 *                   type: string
 *                   example: Brand updated successfully!
 *       404:
 *         description: Бренд не найден
 */

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Удалить бренд
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID бренда
 *     responses:
 *       200:
 *         description: Успешное удаление
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Brand deleted successfully!
 *       404:
 *         description: Бренд не найден
 */
