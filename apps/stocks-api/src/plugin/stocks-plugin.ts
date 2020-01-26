import { ServerConstants } from '../constants/server.constants';
import { StockAPIPlugin } from './stocks.api';

interface IRequest extends Request {
    payload: IStockPayload;
}
interface IStockPayload {
    symbol: string;
    period: string;
    token: string;
    envURL: string;
}

const stockChartResponse = async (symbol, period, token, envURL) => await StockAPIPlugin.getStocks(envURL + '/beta/stock/' + symbol + '/chart/' + period + '?token=' + token);

export const stockPlugin = {
    name: 'stockplugin',
    register: async function (server) {
        server.route({
            method: 'POST',
            path: '/api/stocks-api',
            handler: async (request: IRequest, h) => {
                const { symbol, period, token, envURL } = request.payload;
                return await server.methods.callAPI(symbol, period, token, envURL);
            }
        });
        console.log('Server running on %s', server.info.uri);
        server.method('callAPI', await stockChartResponse,
            { cache: { expiresIn: ServerConstants.expiryTimeout, generateTimeout: ServerConstants.generateTimeout } });

    }
};