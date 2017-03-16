// const webpackHotMiddleware = require('webpack-hot-middleware');
//
// module.exports = (compiler, option) => {
//   const action = webpackHotMiddleware(compiler, option);
//
//   const middleware = (fn, ctx) => (
//     new Promise((resolve) => {
//       const { req, res } = ctx,
//             writeHead = res.writeHead;
//
//       res.writeHead = (...args) => {
//         if (args.length > 1) {
//           console.log(args);
//           ctx.status = args[0];
//           ctx.set(args[1]);
//         } else {
//           writeHead.apply(res, args);
//         }
//       };
//
//       fn(req, res, () => {
//         resolve(null, 1);
//       });
//     })
//   );
//
//   return async (ctx, next) => {
//     try {
//       await middleware(action, ctx);
//
//       await next();
//     } catch (err) {
//       console.error(err);
//     }
//   };
// };
