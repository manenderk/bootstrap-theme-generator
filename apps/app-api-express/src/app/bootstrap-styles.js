import * as express from 'express';
import { PrismaClient } from '@prisma/client'

const BootstrapStyleRouter = express.Router();
const prisma = new PrismaClient();

BootstrapStyleRouter.get('/default-styles', async (req, res, next) => {
  const styles = await prisma.bootstrapVariable.findMany();
  res.send(styles)
})
BootstrapStyleRouter.post('/default-styles', (req, res, next) => {
  res.send('Hello2')
})


export default BootstrapStyleRouter;
