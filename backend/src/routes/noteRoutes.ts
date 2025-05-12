import express from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/noteController.js';
// import authMiddleware from '../middleware/authMiddleware'; // Example if you add auth

const router = express.Router();

router.route('/')
  .get(getNotes) // Potentially add authMiddleware later
  .post(createNote); // Potentially add authMiddleware later

router.route('/:id')
  .put(updateNote) // Potentially add authMiddleware later
  .delete(deleteNote); // Potentially add authMiddleware later

export default router;
