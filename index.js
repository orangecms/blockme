const Blocker = require('./lib/blocker');

const blocker = new Blocker();

const start = new Date();
blocker.blockMe();
blocker.blockMeNot();
console.log(`It took me ${new Date() - start}ms.`);
