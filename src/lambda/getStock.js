import { findAvanzaId, getAvanzaData } from "./utils/avanza";
import Database from './utils/database';

let database = null;

exports.handler = async function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    if (database == null) {
      database = new Database()
      await database.connect()
    }

    const body = await JSON.parse(event.body);
    const isin = body.isin;

    let stock = await database.findOne(isin);
    if (!stock) {
      const name = body.name;
      const avanzaStock = findAvanzaId(name);
      if (!avanzaStock) return { statusCode: 204 }
      const response = await getAvanzaData(avanzaStock.api_id);
      stock = await response.json();
      database.addOne(stock);
    } else {
      stock = stock.data;
    }
    return {
      statusCode: 200,
      body: JSON.stringify(stock)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err.message)
    }
  }
};
