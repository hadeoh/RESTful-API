  
const Post = require('../models/post.model');

describe('Post model', () => {
  test('Content must be required', async () => {
    expect.assertions(1);

    try {
      await Post.create({ });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test('Content must be string', async () => {
    expect.assertions(0);

    try {
      await Post.create({
        content: "The boy is good"
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});