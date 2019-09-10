import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import PluginDbAgent from './src/plugin/PluginDbAgent';
import UserDbAgent from './src/user/UserDbAgent';

export function generateResponse(statusCode, body) {
  return {
    statusCode,
    body: JSON.stringify(body, null, 2),
  }
}

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return generateResponse(200, {
    message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
    input: event,
  });
}

export const postUser: APIGatewayProxyHandler = async (event, _context) => {
  const result = await UserDbAgent.createUser(event);
  return generateResponse(200, result);
}

export const getUser: APIGatewayProxyHandler = async (event, _context) => {
  const result = await UserDbAgent.getUser(event);
  return generateResponse(200, result);
}

export const deleteUser: APIGatewayProxyHandler = async (event, _context) => {
  const result = await UserDbAgent.deleteUser(event);
  return generateResponse(200, result);
}

export const updateUser: APIGatewayProxyHandler = async (event, _context) => {
  const result = await UserDbAgent.updateUser(event);
  return generateResponse(200, result);
}

export const postPlugin: APIGatewayProxyHandler = async (event, _context) => {
  const result = await PluginDbAgent.createPlugin(event);
  return generateResponse(200, result);
}

export const getPlugin: APIGatewayProxyHandler = async (event, _context) => {
  const result = await PluginDbAgent.getPlugin(event);
  return generateResponse(200, result);
}

export const getAllPlugin: APIGatewayProxyHandler = async (event, _context) => {
  const result = await PluginDbAgent.getAllPlugin(event);
  return generateResponse(200, result);
}

export const deletePlugin: APIGatewayProxyHandler = async (event, _context) => {
  const result = await PluginDbAgent.deletePlugin(event);
  return generateResponse(200, result);
}

export const updatePlugin: APIGatewayProxyHandler = async (event, _context) => {
  const result = await PluginDbAgent.updatePlugin(event);
  return generateResponse(200, result);
}