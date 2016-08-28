const Blocker = require('../lib/blocker');
jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;

class Timer {
  constructor() {
    this.stop = this.stop.bind(this);
    this.promise = new Promise((resolve, reject) => {
      const startTime = new Date();
      const timeout = 10;
      setTimeout(() => {
        const timeTaken = new Date() - startTime;
        console.info(`\n\n--- Time taken: ${timeTaken}ms ---`);
        (timeTaken < timeout) ? resolve() : reject();
      }, 0);
    });
  }

  stop() {
    return this.promise;
  }
};

describe('blockme', () => {
  it('should not block for huge amounts of data', (done) => {
    const blocker = new Blocker();
    expect(blocker.isDone()).toEqual(false);
    (new Timer()).stop()
      .then(() => {
        // we expect the promise to be kept (no timeout)
        expect(blocker.isDone()).toEqual(true);
        done();
      })
      .catch(() => expect(blocker.isDone()).toEqual(false));
    blocker.blockMe(1000); // a thousand
  });

  it('should block for huge amounts of data', (done) => {
    const blocker = new Blocker();
    expect(blocker.isDone()).toEqual(false);
    (new Timer()).stop()
      .then(() => expect(blocker.isDone()).toEqual(false))
      .catch(() => {
        // we expect the promise to be broken (timeout)
        expect(blocker.isDone()).toEqual(true);
        done();
      });
    blocker.blockMe(1000 * 1000); // a million
  });
});

describe('blockmenot', () => {
  it('should not block, even for huge amounts of data', (done) => {
    const blocker = new Blocker();
    expect(blocker.isDone()).toEqual(false);
    (new Timer()).stop()
      .then(() => {
        // we expect the promise to be kept (no timeout)
        // however, since it's async, `blocker.isDone()` might return false
        const isDone = blocker.isDone();
        expect(([true, false]).includes(isDone)).toEqual(true);
        console.info(`Data processing is ${isDone ? '' : 'not yet '}done.`);
        done();
      })
      .catch(() => expect(blocker.isDone()).toEqual(false));
    blocker.blockMeNot(1000 * 1000); // a million
  });
});
