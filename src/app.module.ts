import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TestController } from './test/test.controller';
import { ListModule } from './list/list.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    UserModule,
    ListModule,
    ConfigModule.ForRoot({
      path: 'Fox',
    }),
    UploadModule,
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
