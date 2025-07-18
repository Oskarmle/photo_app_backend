import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockService } from './mock.service';

// Entities
import { Role } from 'src/auth/entities/role.entity';
import { Collection } from 'src/collections/entities/collection.entity';
import { Image } from 'src/images/entities/image.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Image, Collection])],
  providers: [MockService],
})
export class MockModule {}
