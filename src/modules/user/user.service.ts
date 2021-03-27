import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserCreateBodyDto, UserUpdateBodyDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async find() {
    return await this.userRepository.find();
  }

  public async findByIdOrFail(id: string) {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  public async create(createBodyDto: UserCreateBodyDto) {
    const exisitingUsername = await this.userRepository.findOne({
      username: createBodyDto.username,
    });

    if (exisitingUsername) {
      throw new UnprocessableEntityException('User already exists');
    }

    try {
      return await this.userRepository.createAndSave(createBodyDto);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  public async update(id: string, updateBodyDto: UserUpdateBodyDto) {
    try {
      return await this.userRepository.createAndUpdate(id, updateBodyDto);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
