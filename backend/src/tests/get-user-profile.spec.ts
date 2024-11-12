import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterUseCase } from '../use-cases/register';
import { compare, hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '../use-cases/errors/user-already-exists-error';
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found';

let usersRepository: InMemoryUsersRepository;
let getUserProfileUseCase: GetUserProfileUseCase;
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser  = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await getUserProfileUseCase.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(createdUser.id);
    expect(user.name).toBe(createdUser.name);
  });

  it('should not be able to get user profile with wrong id', async () => {
    expect(() => getUserProfileUseCase.execute({
      userId: 'non-existing-id',
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
