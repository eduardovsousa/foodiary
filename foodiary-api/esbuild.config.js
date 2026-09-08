/* eslint-disable @typescript-eslint/no-unused-vars */
import esbuildPluginTsc from 'esbuild-plugin-tsc';

export default (serverless) => {
  return {
    plugins: [
      esbuildPluginTsc({
        force: true,
        forceEsm: true,
      }),
    ],
  };
};
