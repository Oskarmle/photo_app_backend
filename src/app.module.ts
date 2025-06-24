import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';
import { CollectionsModule } from './collections/collections.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ImagesModule, CollectionsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
