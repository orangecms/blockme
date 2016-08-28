/**
 * A simple class to demonstrate blocking and non-blocking functions
 */
module.exports = class Blocker {
  constructor () {
    this.called = false;
  }

  getCalled() { return this.called };

  /**
   * A seriously blocking function
   */
  blockMe() {
    for (let i = 0; i < 999999999; i++) null;
    this.called = true;
  };

  /**
   * A simple function calling a time-consuming function asynchronously
   */
  blockMeNot(callback = () => null) {
    setTimeout(() => {
      this.blockMe();
      callback();
    }, 0);
  };
}
