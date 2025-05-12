import mongoose, { Document, Schema } from 'mongoose';
// import bcrypt from 'bcryptjs'; // For password hashing

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: 'user' | 'admin';
  // comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  passwordHash: { // Store hashed password, not plain text
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  }
}, { timestamps: true });

// // Method to compare password
// UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
//   return await bcrypt.compare(password, this.passwordHash);
// };

// // Hash password before saving
// UserSchema.pre<IUser>('save', async function(next) {
//   if (!this.isModified('passwordHash')) { // 'passwordHash' used here because we directly set it as hashed
//     return next();
//   }
//   // If you were to take a plain password and hash it here:
//   // if (!this.isModified('password')) return next();
//   // const salt = await bcrypt.genSalt(10);
//   // this.password = await bcrypt.hash(this.password, salt);
//   next();
// });


export default mongoose.model<IUser>('User', UserSchema);
