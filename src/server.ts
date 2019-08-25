import 'reflect-metadata';
// Import app modules
import Koa from 'koa';
import path from 'path';
import http from 'http';
import chalk from 'chalk';
import send from 'koa-send';
import config from 'config';
import serve from 'koa-static';
import morgan from 'koa-morgan';
import Router from 'koa-router';

// Init app
const app = new Koa();
const router = new Router();
// logger middleware
app.use(morgan('combined'));
// Static middleware
app.use(serve(path.join(__dirname, 'public')));
// Routes
router.get('/api/home', async (ctx: Koa.Context) => (ctx.body = 'Hello world'));
router.get(
  '/api/about',
  async (ctx: Koa.Context) => (ctx.body = 'Hello from about page')
);
// route Middleware
app.use(router.routes()).use(router.middleware());
// Spa
app.use(async (ctx: Koa.Context) => await send(ctx, 'index.html'));
// App port
const PORT = config.get('PORT');
// Listen for server request
const server: http.Server = app.listen(PORT);
// Handle server error
server
  .on('listening', () =>
    console.log(chalk.bgMagenta(`Server started running on port ${PORT}`))
  )
  .once('error', (error: Error) => {
    console.log(chalk.bgRed(`Server starting error`));
    console.log(error);
  });
