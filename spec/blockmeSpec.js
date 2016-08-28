const Blocker = require('../lib/blocker');
jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;

class Timer {
  constructor() {
    this.stop = this.stop.bind(this);
    this.promise = new Promise((resolve, reject) => {
      const startTime = new Date();
      const timeout = 1000;
      setTimeout(() => {
        const timeTaken = new Date() - startTime;
        console.info(`\n--- Time taken: ${timeTaken}ms ---\n`);
        (timeTaken < timeout) ? resolve() : reject();
      }, 0);
    });
  }

  stop() {
    return this.promise;
  }
};

describe('blockme', () => {
  it('should block', (done) => {
    const timer = new Timer();
    const blocker = new Blocker();
    blocker.blockMe();
    timer.stop().catch(done); // we expect the promise to be broken (timeout)
  });
});

describe('blockmenot', () => {
  it('should not block', (done) => {
    const timer = new Timer();
    const blocker = new Blocker();
    blocker.blockMeNot();
    timer.stop().then(done); // we expect the promise to be kept (no timeout)
  });
});
