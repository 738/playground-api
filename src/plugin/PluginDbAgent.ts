import * as AWS from 'aws-sdk';
import { isEmpty } from '../util/GeneralUtil';

const docClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' });

const table = "plgr-plugin";

// var year = 2015;
// var title = "The Big New Movie";

// var params = {
//     TableName: table,
//     Item: {
//         "year": year,
//         "title": title,
//         "info": {
//             "plot": "Nothing happens at all.",
//             "rating": 0
//         }
//     }
// };

// console.log("Adding a new item...");
// docClient.put(params, function (err, data) {
//     if (err) {
//         console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Added item:", JSON.stringify(data, null, 2));
//     }
// });

class PluginDbAgent {
    async getPlugin(event: any): Promise<any> {
        try {
            let params = {
                TableName: table,
                Key: {
                    id: event.pathParameters.id,
                }
            }
            // console.log(event);
            // let result = await docClient.get(params);
            const result = await new Promise((resolve, reject) => {
                docClient.get(params, function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
            })

            if (isEmpty(result)) {
                return {
                    resultCode: 1,
                    resultMessage: '존재하지 않는 아이디입니다.'
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
            return { resultCode: 99, resultMessage: err };
        }
    }

}

export default new PluginDbAgent();
