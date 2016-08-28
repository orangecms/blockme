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
  blockMe(limit = 0, func = () => null, args = null) {
    for (let i = 0; i < limit; i++) func(args);
    this.done = true;
  };

  /**
   * A simple function calling a time-consuming function asynchronously
   */
  blockMeNot(limit = 0, func = () => null, args = null) {
    setTimeout(() => this.blockMe(limit, func, args), 0);
  };
}
