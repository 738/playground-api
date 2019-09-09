import * as AWS from 'aws-sdk';
import { isEmpty } from '../util/GeneralUtil';
const uuidv4 = require('uuid/v4');

const docClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' });

const table = "plgr-plugin";

class PluginDbAgent {
    async createPlugin(event: any): Promise<any> {
        try {
            const item = JSON.parse(event.body);
            let params = {
                TableName: table,
                Item: {
                    "plugin_id": uuidv4(),
                    "name": item.name,
                    "authorId": item.authorId,
                    "description": item.description,
                    "index_html": item.index_html,
                    "index_js": item.index_js,
                    "manifest": item.manifest,
                    "desc": {
                        "test": "test_value",
                        "rating": 0
                    }
                }
            }
            const result = await docClient.put(params).promise();

            return {
                resultCode: 0,
                resultMessage: 'createPlugin 성공',
                data: result
            };
        }
        catch (err) {
            return { resultCode: 99, resultMessage: err };
        }
    }

    async getPlugin(event: any): Promise<any> {
        try {
            let params = {
                TableName: table,
                Key: {
                    plugin_id: event.pathParameters.id,
                }
            }
            const result = await docClient.get(params).promise();

            if (isEmpty(result)) {
                return {
                    resultCode: 1,
                    resultMessage: '존재하지 않는 플러그인입니다.'
                }
            } else {
                return {
                    resultCode: 0,
                    resultMessage: 'success',
                    data: result
                };
            }
        }
        catch (err) {
            return { resultCode: 99, test: event.pathParameters.id, resultMessage: err };
        }
    }

    async getAllPlugin(event: any): Promise<any> {
        try {
            let params = {
                TableName: table,
            }
            const result = await new Promise((resolve, reject) => {
                docClient.scan(params, function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
            })

            if (isEmpty(result)) {
                return {
                    resultCode: 1,
                    resultMessage: 'failed'
                }
            } else {
                return {
                    resultCode: 0,
                    resultMessage: 'success',
                    data: result
                };
            }
        }
        catch (err) {
            return { resultCode: 99, test: event.pathParameters.id, resultMessage: err };
        }
    }

    async deletePlugin(event: any): Promise<any> {
        try {
            const item = JSON.parse(event.body);
            const { plugin_id } = item;
            let params = {
                TableName: table,
                Key: {
                    "plugin_id": plugin_id,
                }
            }
            const result = await new Promise((resolve, reject) => {
                docClient.delete(params, function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
            })

            return {
                resultCode: 0,
                resultMessage: 'deletePlugin 성공',
                data: result
            };
        }
        catch (err) {
            return { resultCode: 99, resultMessage: err };
        }
    }
    async updatePlugin(event: any): Promise<any> {
        try {
            const item = JSON.parse(event.body);
            const { plugin_id } = item;
            delete item.plugin_id;
            const update_attributes = item;
            let params = {
                TableName: table,
                Key: {
                    "plugin_id": plugin_id,
                },
                UpdateExpression: "set name = :n, authorId = :a, description = :d, index_html = :h, index_js = :j, manifest = :m",
                ExpressionAttributeValues: update_attributes,
                ReturnValues: "UPDATED_NEW"
            }
            const result = await new Promise((resolve, reject) => {
                docClient.update(params, function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
            })

            return {
                resultCode: 0,
                resultMessage: 'updatePlugin 성공',
                data: result
            };
        }
        catch (err) {
            return { resultCode: 99, resultMessage: err };
        }
    }

}

export default new PluginDbAgent();
