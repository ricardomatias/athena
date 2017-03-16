/* eslint arrow-body-style: ["error", "always"] */

module.exports.promisify = function promisify(method, ...args) {
  return new Promise((resolve, reject) => {
    return method(...args, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};
