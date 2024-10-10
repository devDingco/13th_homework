// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //     distDir: 'build'
// // }

// // module.exports = nextConfig

// const VERSION = '0.0.1';

// //TODO: REMOVE UNSAFE INLINE
// const cspHeader = `
//     default-src 'self';
//     script-src 'self'
//     'unsafe';
//     style-src 'self';
//     img-src 'self' blob: data:;
//     font-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     form-action 'self';
//     frame-ancestors 'none';
//     upgrade-insecure-requests;
// `;

// const crypto = require('crypto');

// module.exports = {
//   headers: () => {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'Content-Security-Policy',
//             value: cspHeader.replace(/\n/g, ''),
//           },
//         ],
//       },
//     ];
//   },
//   generateBuildId: () => {
//     return crypto.createHash('sha256').update(VERSION).digest('hex');
//   },
// };