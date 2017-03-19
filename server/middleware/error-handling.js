const util = require('util');

function log(data) {
  console.log(util.inspect(data, {
    colors: true,
    depth: null
  }));
}

function logError(error) {
  log(`Error Origin: ${error.origin}`);

  console.error(error);
}

const general = {
  type: 'INTERNAL_ERROR',
  message: 'Something went wrong, try again',
  code: 500
};

module.exports = () => (async (ctx, next) => {
  try {
    let err;

    // Go down the stream
    await next();

    if (ctx.error) {
      err = ctx.error;

      logError(err);

      ctx.status = err.code || general.code;

      ctx.body = JSON.stringify({
        type: err.type || general.type,
        message: err.message || general.message
      });
    }
  } catch (error) {
    logError(error);

    ctx.status = error.code || general.code;

    ctx.body = JSON.stringify(general);
  }
});
