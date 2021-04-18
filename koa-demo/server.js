const Koa = require('koa');
const app = new Koa();
const path = require('path')
const static = require('koa-static')
const port = 3000

app.use(static(
  path.join(__dirname, './public')
))

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))