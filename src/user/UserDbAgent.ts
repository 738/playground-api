import * as AWS from 'aws-sdk';
import { isEmpty } from '../util/GeneralUtil';

const docClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-2' });

const table = "User";

class UserDbAgent {
    async createUser(event: any): Promise<any> {
        try {
            const item = JSON.parse(event.body);
            const { user_id } = item;
            let params = {
                TableName: table,
                Item: {
                    "user_id": user_id,
                }
            }
            const result = await new Promise((resolve, reject) => {
                docClient.put(params, function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
            })

            return {
                resultCode: 0,
                resultMessage: 'createUser 성공',
                data: result
            };
        }
        catch (err) {
            return { resultCode: 99, resultMessage: err };
        }
    }

    async getUser(event: any): Promise<any> {
        try {
            let params = {
                TableName: table,
                Key: {
                    user_id: event.pathParameters.id,
                }
            }
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
                    resultMessage: '존재하지 않는 유저입니다.'
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
    async deleteUser(event: any): Promise<any> {
        try {
            const item = JSON.parse(event.body);
            const { user_id } = item;
            let params = {
                TableName: table,
                Key: {
                    "user_id": user_id,
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
                resultMessage: 'deleteUser 성공',
                data: result
            };
        }
        catch (err) {
            return { resultCode: 99, resultMessage: err };
        }
    }
    async updateUser(event: any): Promise<any> {
        try {
            const item = JSON.parse(event.body);
            const { user_id } = item;
            let params = {
                TableName: table,
                Key: {
                    "user_id": user_id,
                }
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
                resultMessage: 'deleteUser 성공',
                data: result
            };
        }
        catch (err) {
            return { resultCode: 99, resultMessage: err };
        }
    }

}

export default new UserDbAgent();
