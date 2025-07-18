import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';
import { CollectionsModule } from './collections/collections.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from 'data.source';

// Import entities
import { User } from './users/entities/user.entity';
import { Role } from './auth/entities/role.entity';
import { Collection } from './collections/entities/collection.entity';
import { Image } from './images/entities/image.entity';
import { ConfigModule } from '@nestjs/config';
import { MockModule } from './mock/mock.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dbConfig),

    // For seed service:
    TypeOrmModule.forFeature([User, Role, Collection, Image]),
    UsersModule,
    ImagesModule,
    CollectionsModule,
    AuthModule,
    MockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
