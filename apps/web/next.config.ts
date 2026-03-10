import path from "node:path";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  turbopack: {
    root: path.join(__dirname),
  },
};

const withMDX = createMDX({
  // Optional: add remark/rehype plugins later
});

export default withMDX(nextConfig);