import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Role } from 'src/auth/entities/role.entity';
import { Collection } from 'src/collections/entities/collection.entity';
import { Image } from 'src/images/entities/image.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // autoLoadEntities: true,
  synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
  dropSchema: true, // This is useful for development to reset the database schema.
  // entities: ['dist/**/*.entity{.ts,.js}'], // This broke the e2e test
  entities: [Role, User, Image, Collection], // This makes the e2e test work
  migrations: ['dist/src/migrations/*{.ts,.js}'],
};

const datasource = new DataSource(dbConfig as DataSourceOptions);
export default datasource;
