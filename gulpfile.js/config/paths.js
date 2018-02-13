var config = {};

config.app = "./app";
config.tmp = "./tmp";
config.htmldoc = "./htmldoc";
config.htmldocAssets = config.htmldoc + "/assets";
config.vendor = "./vendor";

config.sourceAssets    = config.app + "/assets";
config.sourceViews    = config.app + "/views";
config.publicAssets    = config.htmldoc + "/assets";

module.exports = config;
