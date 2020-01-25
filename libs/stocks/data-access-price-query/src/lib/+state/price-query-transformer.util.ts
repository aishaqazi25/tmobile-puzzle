import { PriceQueryResponse, PriceQuery } from './price-query.type';
import { map, pick } from 'lodash-es';
import { parse } from 'date-fns';
import * as moment from 'moment';

export function transformPriceQueryResponse(
  response: PriceQueryResponse[], startDate: Date, endDate: Date
): PriceQuery[] {
  return map(
    response,
    responseItem =>
      ({
        ...pick(responseItem, [
          'date',
          'open',
          'high',
          'low',
          'close',
          'volume',
          'change',
          'changePercent',
          'label',
          'changeOverTime'
        ]),
        dateNumeric: parse(responseItem.date).getTime()
      } as PriceQuery)
  ).filter(item => {
    const dateTemp = moment(item.date);
    return (dateTemp.isBetween(startDate, endDate, 'day', '[]'));
  });
}
