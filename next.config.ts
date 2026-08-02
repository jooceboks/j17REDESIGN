import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Photography still lives on the client's S3 bucket. Allowing that one
     * host lets next/image optimize the existing assets without copying them
     * into the repo. When final photography lands in /public/img/, this can
     * be removed along with siteConfig.assetBase.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dp-prod.s3.us-east-2.amazonaws.com",
        pathname: "/img/tmp/j17performance.com/**",
      },
      // YouTube poster frames for the lazy-loaded homepage video.
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },

  /**
   * The old site's three retired program URLs. They were still linked from
   * the stale contact page, so they have accumulated links and index history.
   * Permanent redirects preserve that equity and kill the dead ends.
   */
  async redirects() {
    return [
      {
        source: "/youth-strength-conditioning-group-training",
        destination: "/youth",
        permanent: true,
      },
      {
        source: "/adult-strength-conditioning-group-training",
        destination: "/athletic-performance",
        permanent: true,
      },
      {
        source: "/private-athletic-performance-training",
        destination: "/personal-training",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
