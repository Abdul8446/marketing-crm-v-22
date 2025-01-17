// let userConfig = undefined
// try {
//   userConfig = await import('./v0-user-next.config')
// } catch (e) {
//   // ignore error
// }

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
//   experimental: {
//     webpackBuildWorker: true,
//     parallelServerBuildTraces: true,
//     parallelServerCompiles: true,
//   },
// }

// mergeConfig(nextConfig, userConfig)

// function mergeConfig(nextConfig, userConfig) {
//   if (!userConfig) {
//     return
//   }

//   for (const key in userConfig) {
//     if (
//       typeof nextConfig[key] === 'object' &&
//       !Array.isArray(nextConfig[key])
//     ) {
//       nextConfig[key] = {
//         ...nextConfig[key],
//         ...userConfig[key],
//       }
//     } else {
//       nextConfig[key] = userConfig[key]
//     }
//   }
// }

// export default nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables eslint during the build process
  },
  typescript: {
    ignoreBuildErrors: true, // Skips TypeScript checks during build
  },
  images: {
    unoptimized: true, // Disable image optimization during development
  },
  experimental: {
    webpackBuildWorker: true, // Enable Webpack build worker for faster builds
    parallelServerBuildTraces: true, // Enable parallel build tracing
    parallelServerCompiles: true, // Enable parallel server-side code compilation
  },
  // You can add more configurations here as needed
};

export default nextConfig;
