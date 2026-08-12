import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Não usamos next/image — exclui o sharp do bundle das funções serverless
  // (estava deixando a function perto do limite de tamanho da Netlify).
  outputFileTracingExcludes: {
    "*": ["node_modules/sharp/**", "node_modules/@img/**"],
  },
};

export default nextConfig;
