const { defineConfig } = require('@vue/cli-service');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: [],
        customLanguages: [
          {
            label: 'yaml',
            entry: ['monaco-yaml', 'vs/basic-languages/yaml/yaml.contribution'],
            worker: {
              id: 'monaco-yaml/yamlWorker',
              entry: 'monaco-yaml/lib/esm/yaml.worker',
            },
          },
        ],
      }),
    ],
  },
});
