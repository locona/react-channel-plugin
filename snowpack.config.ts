/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  workspaceRoot: '.',
  mount: {
    './playground/public': { url: '/', static: true },
    './playground': { url: '/_dist' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    process.env.BABEL_ENV ? '@snowpack/plugin-babel' : null,
    [
      '@snowpack/plugin-webpack',
      {
        sourceMap: false,
        outputPattern: {
          js: 'js/[id].[contenthash].js',
        },
        htmlMinifierOptions: {
          collapseWhitespace: true,
          minifyCSS: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        },
      },
    ],
  ].filter(Boolean),
  routes: [
    /* Enable an SPA Fallback in development: */
    { match: 'routes', src: '.*', dest: '/index.html' },
  ],
  alias: {
    'react-channel-plugin': './src',
  },
  packageOptions: {
    knownEntrypoints: ['github-buttons', 'react/jsx-runtime'],
    polyfillNode: true,
  },
  devOptions: {
    open: 'none',
    port: 3000,
  },
  buildOptions: {
    out: 'build',
  },
};