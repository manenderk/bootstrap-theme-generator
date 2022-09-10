import * as express from 'express';
import { PrismaClient } from '@prisma/client'
import * as sass from 'sass';

const BootstrapStyleRouter = express.Router();
const prisma = new PrismaClient();

BootstrapStyleRouter.get('/default-styles', async (req, res) => {
  const styles = await prisma.bootstrapVariable.findMany();
  res.send(styles)
})
BootstrapStyleRouter.post('/computed-style', (req, res) => {
  const result = sass.compile('node_modules/bootstrap/scss/bootstrap.scss');
  res.json({
    style: result.css
  })
})


export default BootstrapStyleRouter;
