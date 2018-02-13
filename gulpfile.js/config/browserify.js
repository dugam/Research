var paths = require('./paths');

module.exports = {
  bundleConfigs: [
    {
      entries: paths.sourceAssets + "/scripts/bundle.js",
      dest: paths.htmldocAssets + "/js",
      outputName: "bundle.js"
    }
  ]
};
