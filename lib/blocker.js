/**
 * A simple class to demonstrate blocking and non-blocking functions
 */
module.exports = class Blocker {
  constructor () {
    this.done = false;
  }

  isDone() { return this.done };

  /**
   * A seriously blocking function
   */
  blockMe(limit = 0) {
    for (let i = 0; i < limit; i++) null;
    this.done = true;
  };

  /**
   * A simple function calling a time-consuming function asynchronously
   */
  blockMeNot(limit = 0) {
    setTimeout(() => this.blockMe(limit), 0);
  };
}
