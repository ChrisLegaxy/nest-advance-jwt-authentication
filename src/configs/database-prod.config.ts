import { registerAs } from '@nestjs/config';

import { join } from 'path';

export default registerAs('database-prod', () => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'advance_auth',
  entities: [join(__dirname, '../**/*.entity.js')],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
}));
