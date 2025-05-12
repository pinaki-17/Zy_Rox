import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
  date: Date;
  color?: string;
  userId?: string; // Optional: if you implement user-specific notes
}

const NoteSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  color: {
    type: String,
  },
  userId: { // Example: To associate notes with users
    type: String, 
    // type: Schema.Types.ObjectId,
    // ref: 'User', // If you have a User model
  },
}, { timestamps: true });

export default mongoose.model<INote>('Note', NoteSchema);
