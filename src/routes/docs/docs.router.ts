import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { SWAGGER_DOCUMENT } from '../../config/index.js';

const docsRouter = Router();

docsRouter.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(SWAGGER_DOCUMENT, {
    customCss: '.swagger-ui .topbar { display: none }',
  })
);

export { docsRouter };
