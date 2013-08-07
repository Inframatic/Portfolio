define(function (require, exports, module) {
// Pass some config info from the server to the client.
var copyProperties = require('copyProperties');
var config = {};

exports.init = function(_config) {
    copyProperties(config, _config);
};

exports.getConfig = function() {
    return config;
};
});
