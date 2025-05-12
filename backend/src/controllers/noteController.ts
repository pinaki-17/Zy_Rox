import type { Request, Response } from 'express';
import Note, { type INote } from '../models/Note.js';

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public (for now, later could be private)
export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({}).sort({ createdAt: -1 }); // Sort by newest
    res.json(notes);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a note
// @route   POST /api/notes
// @access  Public (for now)
export const createNote = async (req: Request, res: Response) => {
  const { title, content, color } = req.body;

  try {
    const newNote: INote = new Note({
      title,
      content,
      color,
      date: new Date(),
      // userId: req.user.id // If using authentication
    });

    const note = await newNote.save();
    res.status(201).json(note);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Public (for now)
export const updateNote = async (req: Request, res: Response) => {
  const { title, content, color } = req.body;
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // Add authorization check here if notes are user-specific

    note.title = title ?? note.title;
    note.content = content ?? note.content;
    note.color = color ?? note.color;
    note.date = new Date(); // Update date on modification

    await note.save();
    res.json(note);
  } catch (error: any) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Note not found' });
    }
    res.status(500).send('Server Error');
  }
};


// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Public (for now)
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // Add authorization check here if notes are user-specific

    await Note.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Note removed' });
  } catch (error: any) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Note not found' });
    }
    res.status(500).send('Server Error');
  }
};
