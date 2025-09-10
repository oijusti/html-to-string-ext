const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/extension.ts"], // entry point of your extension
  bundle: true,
  platform: "node",
  external: ["vscode"], // don't bundle vscode module
  outfile: "out/extension.js",
  sourcemap: true,
  target: "node18", // or node16 depending on your engines
  format: "cjs", // VS Code requires CommonJS
  minify: true,
}).catch(() => process.exit(1));
