/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
        domains: ['localhost']
    },
};

module.exports = nextConfig;
module.exports = {
  experimental: {
    esmExternals: "loose",
  },
};
