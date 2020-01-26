/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import { stockPlugin } from './plugin/stocks-plugin';

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost'
  });

  await server.register(stockPlugin);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
