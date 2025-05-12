import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
// import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getTasks)     // Add authMiddleware later
  .post(createTask); // Add authMiddleware later

router.route('/:id')
  .put(updateTask)   // Add authMiddleware later
  .delete(deleteTask); // Add authMiddleware later


export default router;
