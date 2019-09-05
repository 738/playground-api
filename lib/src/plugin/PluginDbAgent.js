import * as AWS from 'aws-sdk';
import { isEmpty } from '../util/GeneralUtil';
const uuidv4 = require('uuid/v4');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' });
const table = "plgr-plugin";
class PluginDbAgent {
    async createPlugin(event) {
        try {
            const item = JSON.parse(event.body);
            const { name } = item;
            let params = {
                TableName: table,
                Item: {
                    "plugin_id": uuidv4(),
                    "name": name,
                    "desc": {
                        "test": "test_value",
                        "rating": 0
                    }
                }
            };
            // console.log(event);
            // let result = await docClient.get(params);
            const result = await new Promise((resolve, reject) => {
                docClient.put(params, function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
            });
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
    async getPlugin(event) {
        try {
            let params = {
                TableName: table,
                Key: {
                    plugin_id: event.pathParameters.id,
                }
            };
            // console.log(event);
            // let result = await docClient.get(params);
            const result = await new Promise((resolve, reject) => {
                docClient.get(params, function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
            });
            if (isEmpty(result)) {
                return {
                    resultCode: 1,
                    resultMessage: '존재하지 않는 플러그인입니다.'
                };
            }
            else {
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
}
export default new PluginDbAgent();
//# sourceMappingURL=PluginDbAgent.js.map