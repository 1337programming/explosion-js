"use strict";
var elasticsearch = require('elasticsearch');
var EsHelper = (function () {
    function EsHelper() {
        this.esClient = new elasticsearch.Client({
            host: 'localhost:9200',
            log: 'error'
        });
    }
    EsHelper.prototype.createEsObject = function (indexName, label, content, headers) {
        var esObject = {
            'created_at': new Date(),
            'answer': content,
            'question': label,
            'headers': headers
        };
        this.esClient.create({
            index: indexName + '-' + label,
            type: 'answer',
            body: esObject,
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
