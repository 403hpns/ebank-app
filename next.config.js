/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
};

module.exports = nextConfig;
