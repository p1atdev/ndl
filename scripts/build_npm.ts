// `deno task build:npm`
// reference: https://github.com/denoland/dnt
// TextEncoderとかTextDecoderがダメとか言われて謎！

// ex. scripts/build_npm.ts
import { build, emptyDir } from "./deps.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  scriptModule: false, // トップレベル await は使わないのでfalse
  shims: {
    // see JS docs for overview and more options
    deno: true,
    // domException: true,
    undici: true,
    // blob: true,
    weakRef: true,
    custom: [
      {
        package: {
          name: "web-encoding",
          version: "1.1.5",
        },
        globalNames: [
          "TextEncoder",
          "TextDecoder",
        ],
      },
    ],
  },
  package: {
    // package.json properties
    name: "@p1atdev/ndl",
    version: Deno.args[0],
    description: "National Diet Library, Japan API Client for Node.js",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/p1atdev/ndl.git",
    },
    bugs: {
      url: "https://github.com/p1atdev/ndl/issues",
    },
    // devDependencies: {
    //   "@types/node": "17.0.40",
    //   "@types/text-encoding": "0.0.36",
    //   "web-encoding": "1.1.3",
    // },
  },
  //   compilerOptions: {
  //     target: "ES2021",
  //     lib: [
  //       "es2021.string",
  //     ],
  //   },
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
