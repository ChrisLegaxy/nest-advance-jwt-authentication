import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserCreateBodyDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async getUsers() {
    return await this.userRepository.find();
  }

  public async createUser(createBodyDto: UserCreateBodyDto) {
    if (
      await this.userRepository.findOne({ username: createBodyDto.username })
    ) {
      throw new UnprocessableEntityException('User already exists');
    }

    try {
      return await this.userRepository.createAndSave(createBodyDto);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
