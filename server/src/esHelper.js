"use strict";
let elasticsearch = require('elasticsearch');
class EsHelper {
    constructor() {
        this.esClient = new elasticsearch.Client({
            host: 'localhost:9200',
            log: 'error'
        });
    }
    createEsObject(indexName, label, content, headers) {
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
    }
    loadIntoEs(obj) {
        this.esClient.create({
            index: 'twitter2',
            type: 'tweet',
            body: obj
        }, function (error, response) {
            if (error) {
                console.log('elasticsearch error: ' + error);
            }
        });
    }
}
exports.EsHelper = EsHelper;
//# sourceMappingURL=esHelper.js.map