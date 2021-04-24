const { Schema, model } = require('mongoose');
const { hashPassword } = require('../services/bcrypt.service');

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 250,
      required: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 150,
    },
    userName: {
      type: String,
      index: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 2,
      maxlength: 250,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

UserSchema.index({userName: 'text', email: 'text'})

/**
 * pre-save hooks
 */
UserSchema.pre('save', async function(next) {
  try {
    this.password = await hashPassword(this.toObject());
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * Methods
 */
UserSchema.methods = {
  toJSON() {
    const { password, _id, __v, ...rest } = this.toObject();
    const user = { ...rest, id: _id };
    return user;
  }
};

/**
 * Statics
 */
UserSchema.statics = {};

module.exports = model('User', UserSchema);