"use strict";
var elasticsearch = require('elasticsearch');
var EsHelper = (function () {
    function EsHelper() {
        this.esClient = new elasticsearch.Client({
            host: '54.191.228.241/es',
            log: 'error'
        });
    }
    EsHelper.prototype.createEsObject = function (indexName, content) {
        var esObject = {
            'created_at': new Date(),
            'answer': content
        };
        this.esClient.create({
            index: indexName,
            type: 'answer',
            body: esObject
        }, function (error, response) {
            if (error) {
                console.log('elasticsearch error: ' + error);
            }
        });
    };
    EsHelper.prototype.loadIntoEs = function (obj) {
        this.esClient.create({
            index: 'twitter2',
            type: 'tweet',
            body: obj
        }, function (error, response) {
            if (error) {
                console.log('elasticsearch error: ' + error);
            }
        });
    };
    return EsHelper;
}());
exports.EsHelper = EsHelper;
