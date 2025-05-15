import express from 'express';
import { getTasks, createTask, updateTask, deleteTask, getTaskById, clearCompletedTasks } from '../controllers/taskController.js';
// import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getTasks)     // Add authMiddleware later
  .post(createTask); // Add authMiddleware later

router.route('/:id')
  .put(updateTask)   // Add authMiddleware later
  .delete(deleteTask) // Add authMiddleware later
  .get(getTaskById); // Add authMiddleware later

router.route('/completed')
  .delete(clearCompletedTasks); // Add authMiddleware later

export default router;
