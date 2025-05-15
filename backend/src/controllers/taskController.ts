import type { Request, Response } from 'express';
import Task, { type ITask } from '../models/Task.js';

// @desc    Get all tasks for a user (example)
// @route   GET /api/tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const { completed } = req.query;
    let filter = {};
    // const tasks = await Task.find({ userId: req.user.id }); // Assuming auth
    if (completed === 'true') {
      filter = { completed: true };
    } else if (completed === 'false') {
      filter = { completed: false };
    }

    const tasks = await Task.find(filter); // Public for now, with filtering
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a task
// @route   POST /api/tasks
export const createTask = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const newTask: ITask = new Task({
      title,
      completed: false,
      // userId: req.user.id, // Assuming auth
    });
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (error: any) {
     res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a task (e.g., toggle completion)
// @route   PUT /api/tasks/:id
export const updateTask = async (req: Request, res: Response) => {
  const { title, completed } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    // Add authorization check: if (task.userId.toString() !== req.user.id) ...

    task.title = title ?? task.title;
    task.completed = completed ?? task.completed;
    
    await task.save();
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        // Add authorization check here

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task removed' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    // Add authorization check here

    res.json(task);
  } catch (error: any) {
    // Handle invalid object ID
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Clear all completed tasks
// @route   DELETE /api/tasks/completed
export const clearCompletedTasks = async (req: Request, res: Response) => {
  try {
    await Task.deleteMany({ completed: true });
    res.json({ message: 'Completed tasks cleared' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
