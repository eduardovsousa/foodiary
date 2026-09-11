import esbuildPluginTsc from 'esbuild-plugin-tsc';

export default () => ({
  banner: {
    js: `
      import { createRequire } from "node:module";
      globalThis.require = createRequire(import.meta.url);
    `,
  },

  bundle: true,
  minify: true,
  sourcemap: false,

  external: [
    '@aws-sdk/*',
  ],

  plugins: [
    esbuildPluginTsc({
      force: true,
      forceEsm: true,
    }),
  ],
});
