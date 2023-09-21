/** @type {import('next').NextConfig} */
// next.config.js
const { i18n } = require('./next-i18next.config')


const nextConfig = {
  i18n,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
