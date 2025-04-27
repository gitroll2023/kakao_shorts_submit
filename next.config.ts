import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // 큰 동영상 파일을 처리하기 위한 설정
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/media/',
            outputPath: 'static/media/',
            name: '[name].[hash:8].[ext]',
          },
        },
      ],
    });

    return config;
  },
  // 큰 파일 크기 제한 증가
  experimental: {
    largePageDataBytes: 128 * 1000 * 1000, // 128MB
  },
};

export default nextConfig;
