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
};

module.exports = optimizedImages(withPWA(config));
