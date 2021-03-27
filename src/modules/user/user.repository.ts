import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createAndSave(user: Partial<User>): Promise<User> {
    const newUser = await this.create(user);

    return await this.save(newUser);
  }
}
