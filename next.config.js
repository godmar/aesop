const util = require('util');
const glob = util.promisify(require('glob'));

const debug = process.env.NODE_ENV !== "production";

module.exports = {
  exportPathMap: async function () {
    const base = {
      "/": { page: "/" }
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
