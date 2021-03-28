/**
 * @version 1.0.0
 * @license MIT
 * @copyright CPC
 * @author Chris Legaxy | Chris Van
 * @contact chris.legaxy@gmail.com | chrisvan.vshmr@gmail.com
 */

/**
 * * Packages Imports
 */
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  /**
   * * In order to access function here, instantiate is a must (this.repository.create then save or update)
   * * Especially look out for update
   */
  @BeforeInsert()
  @BeforeUpdate()
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
