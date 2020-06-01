module.exports = (config) => {

  const minimist = require('minimist');
  const path = require('path');
  const testWebpackConfig = require('@skyux-sdk/builder/config/webpack/test.webpack.config');
  const skyPagesConfigUtil = require('@skyux-sdk/builder/config/sky-pages/sky-pages.config');

  const argv = minimist(process.argv.slice(2));
  const skyPagesConfig = skyPagesConfigUtil.getSkyPagesConfig(argv._[0]);
  const webpackConfig = testWebpackConfig.getWebpackConfig(skyPagesConfig, argv);

  const specBundle = `${__dirname}/../node_modules/@skyux-sdk/builder/utils/spec-bundle.js`;
  const specStyles = `${__dirname}/../node_modules/@skyux-sdk/builder/utils/spec-styles.js`;
  const polyfillsBundle = `${__dirname}/../node_modules/@skyux-sdk/builder/src/polyfills.ts`;

  const preprocessors = {};
  preprocessors[polyfillsBundle] = ['webpack'];
  preprocessors[specBundle] = ['webpack', 'sourcemap'];
  preprocessors[specStyles] = ['webpack'];

  const assetsPattern = path.join(process.cwd(), 'src', 'assets', '**');

  const port = 9876;

  config.set({
    browserStack: {
      username: process.env.BROWSER_STACK_USERNAME,
      accessKey: process.env.BROWSER_STACK_ACCESS_KEY,
      port,
      local: false,
      debug: true,
      console: 'verbose'
    },
    customLaunchers: {
      bs_firefox_mac: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: '21.0',
        os: 'OS X',
        os_version: 'Mountain Lion'
      }
    },
    browsers: ['bs_firefox_mac'],
    port,
    webpack: webpackConfig,
    skyPagesConfig,
    preprocessors,
    files: [
      {
        pattern: polyfillsBundle,
        watched: false
      },
      {
        pattern: specBundle,
        watched: false
      },
      {
        pattern: specStyles,
        watched: false
      },
      {
        pattern: assetsPattern,
        included: false,
        served: true,
      }
    ],
    basePath: '',
    frameworks: ['jasmine']
  });
};