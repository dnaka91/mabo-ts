import fs from "node:fs";
import path from "node:path";
import { type BunPlugin } from "bun";
import { generateDtsBundle } from "dts-bundle-generator";

const dtsPlugin: BunPlugin = {
  name: "dts-generator",
  async setup(build) {
    const result = generateDtsBundle(
      build.config.entrypoints.map((entry) => ({ filePath: entry })),
      { preferredConfigPath: "tsconfig.json" },
    );
    const outDir = build.config.outdir || "./dist";

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir);
    }

    await Promise.all(
      build.config.entrypoints.map((entry, index) => {
        const dtsFile = entry.replace(/^.*\//, "").replace(/\.ts$/, ".d.ts");
        const outFile = path.join(outDir, dtsFile);
        return Bun.write(outFile, result[index]);
      }),
    );
  },
};

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  plugins: [dtsPlugin],
});
