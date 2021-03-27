import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createAndSave(user: Partial<User>): Promise<User> {
    const newUser = await this.create(user);

    return await this.save(newUser);
  }

  async createAndUpdate(id: string, user: Partial<User>): Promise<User> {
    const updateUser = await this.create(user);

    await this.update(id, updateUser);

    return await this.findOne(id);
  }
}
