const Wreck = require('@hapi/wreck');

export class StockAPIPlugin {
    static getStocks = async (url) => {
        const { payload } = await Wreck.get(url, { json: true });
        // console.log('calling api' + url);
        return payload;
    }
}