"use strict";
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
class Authentication {
    constructor(port) {
        this.port = port;
    }
    allowCrossDomain(req, res, next) {
        res.header('Access-Control-Allow-Origin', `*`);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    }
}
exports.Authentication = Authentication;
//# sourceMappingURL=authentication.js.map