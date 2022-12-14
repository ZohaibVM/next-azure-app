/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "akamai",
    path: "",
  },
  reactStrictMode: true,
  swcMinify: true,
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/Login",
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
