import 'dotenv/config'
import Koa from 'koa'
import interpreterRouter from './src/routes/interpreter/index.ts'
import bodyParser from 'koa-bodyparser'

const app = new Koa();

app.use(bodyParser());
app.use(interpreterRouter.routes());
app.use(interpreterRouter.allowedMethods());

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`)
})