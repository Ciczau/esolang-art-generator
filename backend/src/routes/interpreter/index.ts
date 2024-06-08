import Router from '@koa/router'
import { parseLanguage } from '../../controllers/interpreter/index.ts';

const router = new Router({prefix: '/api'})

router.post('/interprete', parseLanguage);

export default router;