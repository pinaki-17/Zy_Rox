import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  completed: boolean;
  userId?: string; 
  // Add other fields as needed, e.g., description, dueDate, icon
}

const TaskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model<ITask>('Task', TaskSchema);
