import esbuildPluginTsc from 'esbuild-plugin-tsc';

export default () => ({
  plugins: [
    esbuildPluginTsc({
      force: true,
      forceEsm: true,
    }),
  ],

  external: [
    'node:*',
    'crypto',
    'ksuid',
  ],
});
