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
  exportPathMap: async function () {
    const base = {
      "/": { page: "/" },
      "/toc": { page: "/toc" },
    }
    const files = await glob("content/*/meta.json", {});
    const rest = files.map(f => f.replace('content/', '').replace('/meta.json', ''))
         .reduce((acc, cur) => ({ ...acc, [`/story/${cur}`] : { page: "/story", query: { name: `${cur}` } } }), {});
    return { ...base, ...rest };
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
