const express = require("express");
const {check} = require('express-validator');
const {validarCampos} = require('../middleware/validar-campos');
const { isDate } = require('../helpers/isDate');
const router = express.Router();
const {getTask,createTask,updateTask,deleteTask,findTask} = require("../controllers/task");


/**
 * @swagger
 * /task:
 *  get:
 *    summary: return all tasks
 *    tags: [Task]
 *    responses:
 *      200:
 *        description: all tasks
 *        content:
 *             application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Task'
 */
router.get("/task", getTask);

/**
 * @swagger
 * components:
 *  schemas:
 *    Task:
 *       type: object
 *       properties:
 *           name:
 *               type: string
 *               description: name of task
 *           description:
 *               type: string
 *               description: the description of task
 *           dateInitial:
 *               type: string
 *               description: the content of task
 *           dateFinal:
 *               type: date
 *               description: current date
 *           studentId:
 *               type: string
 *               description: assigned student
 *       required:
 *           - name
 *           - description
 *           - dateInitial
 *           - dateFinal
 *           - studentId
 *       example:
 *           name: Hacer diagramas
 *           description: Se necesitan crear los diagramas del proyecto.
 *           dateInitial: 16434434555
 *           dateFinal: 1665889805573
 *           studentId: 212121k21l
 */

/**
 * @swagger
 * /task:
 *  post:
 *    summary: create a new task
 *    tags: [Task]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: new task created!
 */
router.post('/task',
            [
                check('name','La tarea debe tener un nombre').not().isEmpty(),
                check('description','La tarea debe tener una descripcion').not().isEmpty(),
                check('dateInitial','Fecha de creacion es obligatoria').not().isEmpty(),
                check('dateFinal','Fecha de finalizacion es obligatoria').custom(isDate),
                validarCampos
            ],        
            createTask);




/**
 * @swagger
 * /task/{id}:
 *  get:
 *    summary: return a task
 *    tags: [Task]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the task id
 *          
 *    responses:
 *      200:
 *        description: task found!
 *        content:
 *             application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Task'
 *      404:
 *        description: task not found
 *        
 */     
router.get("/task/:id",findTask);


/**
 * @swagger
 * /task/{id}:
 *  put:
 *    summary: update a task
 *    tags: [Task]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Task'
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the task id
 *    responses:
 *      200:
 *        description: task updated!
 *        content:
 *             application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Task'
 *      404:
 *        description: task not found
 */
router.put("/task/:id",updateTask);

/**
 * @swagger
 * /task/{id}:
 *  delete:
 *    summary: delete a task
 *    tags: [Task]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the task id
 *          
 *    responses:
 *      200:
 *        description: task deleted
 *      404:
 *        description: task not found
 *        
 */  
router.delete("/task/:id",deleteTask);

module.exports = router;