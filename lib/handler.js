import 'source-map-support/register';
import PluginDbAgent from './src/plugin/PluginDbAgent';
export function generateResponse(statusCode, body) {
    return {
        statusCode,
        body: JSON.stringify(body, null, 2),
    };
}
export const hello = async (event, _context) => {
    return generateResponse(200, {
        message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
        input: event,
    });
};
export const postPlugin = async (event, _context) => {
    const result = await PluginDbAgent.createPlugin(event);
    return generateResponse(200, result);
};
export const getPlugin = async (event, _context) => {
    const result = await PluginDbAgent.getPlugin(event);
    return generateResponse(200, result);
};
//# sourceMappingURL=handler.js.map