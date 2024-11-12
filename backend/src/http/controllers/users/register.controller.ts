import { z } from 'zod';
import {FastifyRequest, FastifyReply } from 'fastify';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().max(50),
    email: z.string().email(),
    password: z.string().min(4),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);
  
  try{
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      email,
      password,
    });
  }catch(err) {
    if(err instanceof UserAlreadyExistsError)
      return reply.status(409).send({ message: err.message });

    throw err;
  }

  reply.status(201).send();
}
