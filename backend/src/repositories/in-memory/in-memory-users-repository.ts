import { Prisma, User } from '@prisma/client';
import { UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email) as User;

    if (!user) return null;

    return user;
  }

  async findById(id: string){
    const user = this.items.find((item) => item.id === id) as User;

    if (!user) return null;

    return user;
  }
}
