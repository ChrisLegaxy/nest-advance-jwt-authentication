import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createAndSave(user: Partial<User>) {
    const newUser = this.create(user);

    this.save(newUser);
  }
}
