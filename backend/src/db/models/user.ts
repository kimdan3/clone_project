import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  /**
   * Fields provided by NextAuth.js
   */
  name: String,
  email: String,
  emailVerified: Date,
  image: String,
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
})

export const User = model('User', userSchema)
