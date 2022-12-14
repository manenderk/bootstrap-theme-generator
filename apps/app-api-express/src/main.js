/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as logger from 'morgan';
import BootstrapStyleRouter from './app/bootstrap-styles';

const app = express();
const appRouter = express.Router();

app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

appRouter.use('/boostrap-styles', BootstrapStyleRouter);

app.use('/api', appRouter);


const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
