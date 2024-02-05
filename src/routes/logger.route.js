import { Router } from 'express';

export default (app) => {
  let router = new Router();

  app.use('/loggerTest', router);

  router.get('/', (req, res) => {
    req.logger.silly('silly test');
    req.logger.debug('debug test');
    req.logger.verbose('verbose test');
    req.logger.http('http test');
    req.logger.info('info test');
    req.logger.warn('warn test');
    req.logger.error('error test');
    return res.json({ status: 'ok' });
  });
};
