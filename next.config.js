/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: false,
    domains: ['purecatamphetamine.github.io','logo.clearbit.com'],
  },
  webpack: (config, { webpack, isServer, nextRuntime }) => {
    if (isServer && nextRuntime === "nodejs")
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ })
      );
    return config;
  },
}

module.exports = nextConfig
