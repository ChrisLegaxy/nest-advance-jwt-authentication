import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserCreateBodyDto, UserUpdateBodyDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async find() {
    return await this.userRepository.find();
  }

  public async findById(id: string): Promise<User> | null {
    return await this.userRepository.findOne(id);
  }

  public async findByUsernameOrFail(username: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ username });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  public async findByIdOrFail(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  public async create(createBodyDto: UserCreateBodyDto): Promise<User> {
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

  public async update(
    id: string,
    updateBodyDto: UserUpdateBodyDto,
  ): Promise<User> {
    await this.findByIdOrFail(id);

    try {
      return await this.userRepository.createAndUpdate(id, updateBodyDto);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  public async delete(id: string): Promise<void> {
    await this.findByIdOrFail(id);

    try {
      await this.userRepository.delete(id);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
