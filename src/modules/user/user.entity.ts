import { UnauthorizedException } from '@nestjs/common';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate() // need to call createAndSave from repository in order to work (.update won't work)
  public async hashPasswordBeforeInsert(): Promise<void> {
    if (this.password) {
      this.password = await User.hashPassword(this.password);
    }
  }

  public static hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (error, salt) => {
        if (error) {
          reject(error);
        }
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) {
            reject(error);
          }
          resolve(hash);
        });
      });
    });
  }

  public static async comparePassword(
    password: string,
    user: User,
  ): Promise<boolean> {
    try {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new UnauthorizedException('Incorrect Username or Password');
      }

      return match;
    } catch (error) {
      throw error;
    }
  }
}
