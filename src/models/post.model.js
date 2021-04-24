const { Schema, model } = require('mongoose');

const PostSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 500,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    photo: {
      type: String,
      default: null
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

/**
 * Methods
 */
 PostSchema.methods = {
  toJSON() {
    const { _id, __v, ...rest } = this.toObject();
    const post = { ...rest, id: _id };
    return post;
  }
};

/**
 * Statics
 */
 PostSchema.statics = {};

module.exports = model('Post', PostSchema);