const util = require('util');
const glob = util.promisify(require('glob'));

const debug = process.env.NODE_ENV !== "production";
//const deployPath = '/aesop';
const deployPath = '';

module.exports = {
  assetPrefix: debug ? '' : deployPath,
  publicRuntimeConfig: {
    deployPath: debug ? '' : deployPath,
    staticFolder: debug ? '/static' : `${deployPath}/static`
  },
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.md$/,
        use: 'raw-loader'
      }
    )

    return config
  }
};
