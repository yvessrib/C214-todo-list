import {FastifyInstance } from 'fastify';

import { verifyJWT } from '../../middlewares/verify-jwt';
import { createCheckIn } from './create-check-in';
import { validateCheckIn } from './validate-check-in';
import { checkInsHistory } from './check-ins-history';


export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.get('/check-ins/history', checkInsHistory);
  app.get('/check-ins/metrics', checkInsHistory);
  app.post('/gyms/:gymId/check-ins', createCheckIn);
  app.patch('/check-ins/:checkInId/validate', validateCheckIn);
}