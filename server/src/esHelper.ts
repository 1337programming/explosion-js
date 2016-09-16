declare let require: any;

let elasticsearch = require('elasticsearch');

export class EsHelper {

    private esClient: any = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'error'
    });

    private createEsObject(indexName, content) {
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

    }

    private loadIntoEs(obj) {
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