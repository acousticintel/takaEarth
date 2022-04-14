const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      "http://www.potlabicons.com/",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
    ],
  },
  pwa: {
    dest: "public",
    swSrc: "service-worker.js",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
});
