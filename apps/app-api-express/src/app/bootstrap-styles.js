import * as express from 'express';
import { PrismaClient } from '@prisma/client'
import * as sass from 'sass';
import { writeFile } from 'fs/promises';

const BootstrapStyleRouter = express.Router();
const prisma = new PrismaClient();

BootstrapStyleRouter.get('/default-styles', async (req, res) => {
  const styles = await prisma.bootstrapVariable.findMany();
  res.send(styles)
})
BootstrapStyleRouter.post('/computed-style', async (req, res) => {

  const customizedStyles = JSON.parse(req.body.customizedStyles || '[]');
  const customizedVariables = [];
  const styleIds = customizedStyles.map(s => s.id);
  const bootstrapVariables = await prisma.bootstrapVariable.findMany({
    where: {
      id: { in: styleIds }
    },
  })
  bootstrapVariables.forEach(v => {
    const customStyle = customizedStyles.find(c => c.id == v.id);
    customizedVariables.push(`${v.variableName}: ${customStyle.value};`);
  })
  let result;
  if (bootstrapVariables.length > 0) {
    let dataToWrite = customizedVariables.join(' ');
    dataToWrite += " @import 'node_modules/bootstrap/scss/bootstrap.scss';";
    await writeFile('./mybootstrapfile.scss', dataToWrite);
    result = sass.compile('./mybootstrapfile.scss');
  } else {
    result = sass.compile('node_modules/bootstrap/scss/bootstrap.scss');
  }
  res.json({
    style: result.css || ''
  })
})


export default BootstrapStyleRouter;
