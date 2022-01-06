/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const optimizedImages = require('next-optimized-images');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  webpackDevMiddleware: config => {
    // Solve compiling problem via vagrant
    config.watchOptions = {
      // Check for changes every second
      poll: 1000,
      // delay before rebuilding
      aggregateTimeout: 300,
    };
    return config;
  },
};

module.exports = optimizedImages(withPWA(config));
